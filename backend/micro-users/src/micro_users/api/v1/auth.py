from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from micro_users.schemas import UserSchema, Token, TokenData, UserCreate, UserInDB
from micro_users.db import get_db
from micro_users.models import User
from micro_users.services import (
    authenticate_user,
    create_user,
    get_all_users,
    update_user,
    get_user_by_id,
)
from micro_users.core.security import get_current_user, create_session_token

router = APIRouter()


@router.get("/", response_model=list[UserSchema], tags=["List users"])
async def get_users_route(
    current_user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Lista todos los usuarios de la BBDD
    @param current_user: TokenData con la información del usuario
    @param db: Instancia de la BBDD
    @return: Lista de usuarios
    """

    if not current_user.get("admin"):
        raise HTTPException(
            status_code=403, detail="No tienes permiso para ver esta ruta"
        )
    return get_all_users(db)


@router.get("/{user_id}", response_model=UserSchema, tags=["Get user by id"])
async def get_user_by_id_route(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Busca usuario por su id
    @param current_user: TokenData con la información del usuario
    @param db: Instancia de la BBDD
    @param user_id: Id del usuario a buscar
    @return: Usuario de la BBDD
    """
    return get_user_by_id(user_id, db)


@router.post("/validate", response_model=TokenData, tags=["Validate user"])
async def validate_user(
    get_current_user: User = Depends(get_current_user),
):
    """
    Valida el token de un usuario que pregunta a esta ruta
    @param get_current_user: Toke con la información del usuario
    @return: TokenData con la información del usuario
    """
    if not get_current_user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return get_current_user


@router.post("/token", response_model=Token, tags=["Login"])
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    """
    Lista todos los usuarios de la BBDD
    @param form_data: Datos del usuario en formulario
    @param db: Instancia de la BBDD
    @return: Token JWT con modelo TokenData
    """
    user = authenticate_user(form_data.username.strip(), form_data.password.strip(), db)
    if not user:
        raise HTTPException(status_code=400, detail="Credenciales incorrectos")

    if user.disabled:
        raise HTTPException(
            status_code=401, detail="No tienes permiso para acceder habla con el admin"
        )
    jwt_payload = {
        "sub": str(user.id),
        "email": user.email,
        "admin": user.is_superuser,
        "name": user.name,
    }
    access_token = create_session_token(jwt_payload)

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register", response_model=UserSchema, tags=["Register"], status_code=201)
async def register(user_in: UserCreate, db: Session = Depends(get_db)):
    """
    Registra un usuario de la BBDD
    @param user_in: Datos del usuario en modelo UserCreate
    @param db: Instancia de la BBDD
    @return: Usuario creado
    """
    return create_user(user_in, db)


@router.put("/{user_id}", response_model=UserInDB, tags=["Update user"])
async def update_user_route(
    user_id: int,
    user_in: UserCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Modifica al usuario de la BBDD
    @param current_user: TokenData con la información del usuario
    @param db: Instancia de la BBDD
    @param user_id: Id del usuario a modificar
    @param user_in: Datos del usuario en modelo UserCreate
    @return: Usuario modificado
    """
    if not current_user.get("admin"):
        raise HTTPException(
            status_code=403, detail="No tienes permiso para ver esta ruta"
        )
    return update_user(user_id, user_in, db)


@router.delete("/{user_id}", response_model=UserSchema, tags=["Delete user"])
async def delete_user_route(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Lista todos los usuarios de la BBDD
    @param current_user: TokenData con la información del usuario
    @param db: Instancia de la BBDD
    @param user_id: Id del usuario a eliminar
    @return: Usuario eliminado
    """
    if not current_user.get("admin"):
        raise HTTPException(
            status_code=403, detail="No tienes permiso para ver esta ruta"
        )
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    db.delete(user)
    db.commit()

    return user

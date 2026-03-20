from sqlalchemy.orm import Session
from fastapi import HTTPException
from micro_users.models import User
from micro_users.schemas import UserCreate
from micro_users.core.hashing import get_password_hash, verify_password


def get_user_by_email(email: str, db: Session):
    """
    Método para obtener un usuario por su email en la bbdd
    Uso: Login
    """
    return db.query(User).filter(User.email == email).first()


def get_all_users(db: Session):
    """
    Método para obtener todos los usuarios de la bbdd
    Uso: Pantalla de administración
    """
    users = db.query(User).all()

    if not users:
        raise HTTPException(status_code=404, detail="No hay usuarios registrados")

    return users


def get_user_by_id(user_id: int, db: Session):
    """
    Obtiene usuario por id
    Uso: perfil de usuario, actualización de usuario, eliminación de usuario
    """
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=400, detail="Usuario no encontrado")

    return user


def update_user(user_id: int, user_in: UserCreate, db: Session):
    """
    Método para actualización de usuarios en la bbdd
    Uso: Pantalla de adminstración y en perfil de cada usuario
    """
    user = get_user_by_id(user_id, db)

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    user.email = user_in.email
    user.name = user_in.name
    user.hashed_password = get_password_hash(user_in.password)
    user.surname = user_in.surname
    user.phone = user_in.phone
    user.disabled = user_in.disabled
    user.is_superuser = user_in.is_superuser

    db.commit()
    db.refresh(user)

    return user


def authenticate_user(email: str, password: str, db: Session):
    """
    Comprueba que las credenciales sean válidad
    Uso: Login
    """
    user = get_user_by_email(email, db)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_user(user_in: UserCreate, db: Session):
    """
    Crea usuario en la bbdd
    Uso: Registro
    """

    db_user = get_user_by_email(user_in.email, db)

    if db_user:
        raise HTTPException(status_code=400, detail="El email ya está registrado")

    new_user = User(
        email=user_in.email,
        name=user_in.name,
        hashed_password=get_password_hash(user_in.password),
        surname=user_in.surname,
        phone=user_in.phone,
        disabled=user_in.disabled,
        is_superuser=user_in.is_superuser,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

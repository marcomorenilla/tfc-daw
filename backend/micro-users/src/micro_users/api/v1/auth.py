from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from micro_users.schemas import UserSchema, Token, UserCreate, UserInDB
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


@router.get("/users", response_model=list[UserSchema], tags=["List users"])
async def get_users_route(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    print("current user?", current_user)
    return get_all_users(db)


@router.get("/users/{user_id}", response_model=UserSchema, tags=["Get user by id"])
async def get_user_by_id_route(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_user_by_id(user_id, db)


@router.post("/token", response_model=Token, tags=["Login"])
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = authenticate_user(form_data.username.strip(), form_data.password.strip(), db)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    jwt_payload = {"sub": str(user.id), "email": user.email, "admin": user.is_superuser}
    access_token = create_session_token(jwt_payload)

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register", response_model=UserSchema, tags=["Register"], status_code=201)
async def register(user_in: UserCreate, db: Session = Depends(get_db)):
    return create_user(user_in, db)


@router.put("/users/{user_id}", response_model=UserInDB, tags=["Update user"])
async def update_user_route(
    user_id: int,
    user_in: UserCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return update_user(user_id, user_in, db)


@router.delete("/users/{user_id}", response_model=UserSchema, tags=["Delete user"])
async def delete_user_route(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    db.delete(user)
    db.commit()

    return user

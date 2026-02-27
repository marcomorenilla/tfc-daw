from sqlalchemy.orm import Session
from fastapi import HTTPException
from micro_users.models import User  
from micro_users.schemas import UserInDB 

def get_user_by_email(email: str, db: Session):
    return db.query(User).filter(User.email == email).first()


def create_user(user_in: UserInDB, db: Session):

    db_user = get_user_by_email(user_in.email, db)
    
    if db_user:
        raise HTTPException(status_code=400, detail="El email ya está registrado")

    new_user = User(
        email=user_in.email,
        name=user_in.name,
        hashed_password=user_in.password, 
        surname=user_in.surname,
        phone=user_in.phone
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user) 

    return new_user
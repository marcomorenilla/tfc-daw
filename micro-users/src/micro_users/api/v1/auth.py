from fastapi import APIRouter
from pydantic import BaseModel
from micro_users.schemas import schemas
from micro_users.db.session import get_db
from micro_users.models import User
from fastapi import HTTPException
from sqlalchemy.orm import Session
from fastapi import Depends
from micro_users.services import create_user



router = APIRouter()

@router.post('/login', response_model=schemas.UserSchema, tags=['login'])
async def login(user: schemas.UserCreateSchema, db: Session = Depends(get_db)):
    if user.password =='hola':
        return {'msg':'succesful login'}
    else:
        return {'msg':'failed login'}

@router.post('/register', response_model=schemas.UserSchema, tags=['register'], status_code=201)
async def register(user: schemas.UserCreateSchema, db: Session = Depends(get_db)):
    return create_user(user, db)
    

    
from typing import Annotated
from fastapi import APIRouter
from pydantic import BaseModel
from micro_users.schemas import schemas
from micro_users.db.session import get_db
from micro_users.models import User as UserModel
from fastapi import HTTPException
from sqlalchemy.orm import Session
from fastapi import Depends
from micro_users.services import create_user, get_all_users
from micro_users.core import oauth2_scheme



router = APIRouter()

@router.get('/users', response_model=list[schemas.UserSchema], tags=['List users'])
async def get_users(db: Session = Depends(get_db), token: Annotated[str, Depends(oauth2_scheme)]=None):
    return get_all_users(db)

@router.post('/login', response_model=schemas.UserSchema, tags=['Login'])
async def login(user: schemas.UserInDB, db: Session = Depends(get_db)):
    if user.password =='hola':
        return {'msg':'succesful login'}
    else:
        return {'msg':'failed login'}

@router.post('/register', response_model=schemas.UserSchema, tags=['Register'], status_code=201)
async def register(user: schemas.UserInDB, db: Session = Depends(get_db)):
    return create_user(user, db)
    

    
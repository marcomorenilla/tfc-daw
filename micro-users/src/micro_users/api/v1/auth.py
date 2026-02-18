from fastapi import APIRouter
from pydantic import BaseModel

class User(BaseModel):
    username: str
    password:str

router = APIRouter()

@router.post('/login', tags=['login'])
async def login(user: User):
    if user.password =='hola':
        return {'msg':'succesful login'}
    else:
        return {'msg':'failed login'}

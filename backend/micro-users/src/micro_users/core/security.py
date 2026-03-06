from typing import Annotated
from pwdlib import PasswordHash

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
import jwt
from .config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
password_hash = PasswordHash.recommended()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return password_hash.hash(password)
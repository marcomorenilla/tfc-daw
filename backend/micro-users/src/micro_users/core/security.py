import jwt
from typing import Annotated

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from .config import settings
from micro_users.services import get_user_by_email
from micro_users.db.session import get_db
from sqlalchemy.orm import Session


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)
):
    payload = decode_session_token(token)
    if payload is None:
        return None
    user = get_user_by_email(payload.get("email"), db)
    if user is None:
        return None
    return user


def create_session_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(
        to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
    )
    return encoded_jwt


def decode_session_token(token: str):
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

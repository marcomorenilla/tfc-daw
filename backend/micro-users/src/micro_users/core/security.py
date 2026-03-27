import jwt
from typing import Annotated

from fastapi import Depends, HTTPException

from .config import settings
from micro_users.db.session import get_db
from sqlalchemy.orm import Session

from datetime import datetime, timedelta, timezone

from .oauth_schema import OAuth2PasswordBearerCookie


oauth2_scheme = OAuth2PasswordBearerCookie(tokenUrl="api/v1/token")


def create_session_token(data: dict):
    """
    Crea un token JWT
    Uso: Login
    """
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )
    return encoded_jwt


def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)
):
    """
    Extrae al usuario  del jwt y lo busca en bbdd
    Uso: Acceso a rutas protegidas
    """

    payload = decode_session_token(token)
    if payload is None:
        return HTTPException(status_code=401, detail="Invalid token")

    token_data = {
        "id": payload.get("sub"),
        "name": payload.get("name"),
        "email": payload.get("email"),
        "admin": payload.get("admin"),
    }

    if token_data is None:
        return HTTPException(status_code=400, detail="No existe el usuario")
    return token_data


def decode_session_token(token: str):
    """
    Decodifica un token JWT
    Uso: Acceso a rutas protegidas
    """
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        return payload
    except jwt.ExpiredSignatureError as e:
        print(f"DEBUG: token invalido por: {e}")
        return None
    except jwt.InvalidTokenError as e:
        print(f"DEBUG: token invalido por: {e}")
        return None

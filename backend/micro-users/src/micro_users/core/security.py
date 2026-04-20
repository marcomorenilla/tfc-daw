import jwt

from fastapi import Request, HTTPException
from .config import settings
from datetime import datetime, timedelta, timezone
from fastapi.security import OAuth2PasswordBearer


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/api/v1/token")


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


def get_current_user(request: Request):
    """
    Extrae al usuario  del jwt y lo busca en bbdd
    Uso: Acceso a rutas protegidas
    """
    token = request.cookies.get("tfc_access_token")
    print(f"DEBUG: token: {token}")
    if token is None:
        return HTTPException(status_code=401, detail="No token provided")

    try:
        payload = decode_session_token(token)
        print(f"DEBUG: payload: {payload}")
        if payload is None:
            return HTTPException(status_code=401, detail="Invalid token")

        token_data = {
            "id": payload.get("sub"),
            "name": payload.get("name"),
            "surname": payload.get("surname"),
            "email": payload.get("email"),
            "phone": payload.get("phone"),
            "disabled": payload.get("disabled"),
            "admin": payload.get("admin"),
        }

        if token_data is None:
            return HTTPException(status_code=400, detail="No existe el usuario")
        return token_data
    except jwt.ExpiredSignatureError:
        return HTTPException(status_code=401, detail="Invalid token")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


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

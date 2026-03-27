from fastapi import Request, HTTPException
from fastapi.security import OAuth2PasswordBearer
from typing import Optional


class OAuth2PasswordBearerCookie(OAuth2PasswordBearer):
    async def __call__(self, request: Request) -> Optional[str]:

        token: str = request.cookies.get("tfc_access_token")

        if not token:
            if self.auto_error:
                HTTPException(
                    status_code=401, detail="Usuario no autenticado por falta de token"
                )
            else:
                return None
        return token

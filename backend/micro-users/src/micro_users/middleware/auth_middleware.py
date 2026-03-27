from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import HTTPException


class HttpAuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        excluded_paths = [
            "/users/api/v1/token",
            "/users/api/v1/register",
            "/users/docs",
            "/users/openapi.json",
        ]

        print("path: ", request.url.path)

        if request.url.path not in excluded_paths:
            token = request.cookies.get("access_token")

            if token:
                await call_next(request)
            else:
                raise HTTPException(
                    status_code=401,
                    detail=f"Usuario no autenticado en ruta {request.url.path} ",
                )

        response = await call_next(request)
        return response

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from micro_users.api.v1 import auth
from micro_users.db import Base, engine
from micro_users.models import User


Base.metadata.create_all(bind=engine)

origins = ["*"]

app = FastAPI(
    docs_url="/users/docs",
    redoc_url="/users/redocs",
    openapi_url="/users/openapi.json",
    title="Microservicio usuarios",
    version="0.0.1",
)

app.include_router(auth.router, prefix="/users/api/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

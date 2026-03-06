from fastapi import FastAPI, APIRouter
from micro_users.api.v1 import auth
from dotenv import load_dotenv
from micro_users.db.session import engine, Base


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Microservicio usuarios",
    version="0.0.1"
)

app.include_router(auth.router, prefix='/api/v1')


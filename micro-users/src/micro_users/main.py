from shared_utils.main import say_hi
from fastapi import FastAPI, APIRouter
from micro_users.api.v1 import auth
from dotenv import load_dotenv

load_dotenv()



app = FastAPI()

app.include_router(auth.router, prefix='/api/v1')




from fastapi import FastAPI, APIRouter, Depends, HTTPException, status, Response
from pydantic import BaseModel, Field, BeforeValidator, ConfigDict
from typing import List, Annotated
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv, find_dotenv
import os
from pathlib import Path
from pymongo import MongoClient, AsyncMongoClient
from pymongo import ReturnDocument


load_dotenv(dotenv_path=find_dotenv())


origins = ["http://localhost:4321", "http://127.0.0.1:4321"]

app = FastAPI(
    docs_url="/bikes/docs",
    redoc_url="/bikes/redocs",
    openapi_url="/bikes/openapi.json",
    title="Microservicio bicicletas",
    version="0.0.1",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter(prefix="/bikes/api/v1")

PyObjectId = Annotated[str, BeforeValidator(str)]


class Bike(BaseModel):
    id: PyObjectId = Field(default_factory=ObjectId, alias="_id")
    message: str = Field(...)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={"example": {"message": "Hola mundo"}},
    )


class BikeCollection(BaseModel):
    bikes: List[Bike]


mongo_uri = os.getenv("MONGO_URL")
print("mongo_uri", mongo_uri)
client = AsyncMongoClient(mongo_uri)
db = client.bikes
collection = db["bikes"]


@router.get("/")
async def root():
    print("mongo_uri", mongo_uri)
    return BikeCollection(bikes=await collection.find().to_list(1000))


app.include_router(router)

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
    name: str = Field(...)
    img: str = Field(...)
    rate: int = Field(...)
    posts: int = Field(...)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )


class BikeCollection(BaseModel):
    bikes: List[Bike]


mongo_uri = os.getenv("MONGO_URL")
print("mongo_uri", mongo_uri)
client = AsyncMongoClient(mongo_uri)
db = client.bikes
collection = db["bikes"]


@router.get("/", response_model=BikeCollection, tags=["Get All Bikes"])
async def root():
    return BikeCollection(bikes=await collection.find().to_list(1000))


@router.get("/{bike_id}", response_model=Bike, tags=["Get Bike By Id"])
async def get_bike(bike_id: str):
    bike = await collection.find_one({"_id": ObjectId(bike_id)})
    if bike is None:
        raise HTTPException(status_code=404, detail="Bike not found")
    return bike


app.include_router(router)

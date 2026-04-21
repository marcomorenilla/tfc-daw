from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel, Field, BeforeValidator, ConfigDict
from typing import List, Annotated
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv, find_dotenv
import os
from pymongo import AsyncMongoClient, ReturnDocument


load_dotenv(dotenv_path=find_dotenv())


origins = ["http://localhost:4321", "https://tfc.localhost", "http://127.0.0.1:4321"]

app = FastAPI(
    docs_url="/forums/docs",
    redoc_url="/forums/redocs",
    openapi_url="/forums/openapi.json",
    title="Microservicio foro",
    version="0.0.1",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter(prefix="/forum/api/v1")

PyObjectId = Annotated[str, BeforeValidator(str)]


class Message(BaseModel):
    id: PyObjectId = Field(default_factory=ObjectId, alias="_id")
    user_id: str = Field(...)
    user_name: str = Field(...)
    message: str = Field(...)


class Forum(BaseModel):
    id: PyObjectId = Field(default_factory=ObjectId, alias="_id")
    topic: str = Field(...)
    messages: List[Message] = Field(...)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )


class ForumCollection(BaseModel):
    forums: List[Forum]


mongo_uri = os.getenv("MONGO_URL")
print("mongo_uri", mongo_uri)
client = AsyncMongoClient(mongo_uri)
db = client.forums
collection = db["forums"]


@router.get("/", response_model=ForumCollection, tags=["Get All Forums"])
async def root():
    return ForumCollection(forums=await collection.find().to_list(1000))


@router.get("/{forum_id}", response_model=Forum, tags=["Get Forum By Id"])
async def get_forum(forum_id: str):
    forum = await collection.find_one({"_id": ObjectId(forum_id)})
    if forum is None:
        raise HTTPException(status_code=404, detail="Forum not found")
    return forum


@router.put("/{id}", response_model=ForumCollection, tags=["Update Forum Messages"])
async def create_message(id: str, message: Message):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="ID de foro no válido")

    new_message_dict = message.model_dump(by_alias=True)

    updated_forum = await collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$push": {"messages": new_message_dict}},
        return_document=ReturnDocument.AFTER,
    )

    if not updated_forum:
        raise HTTPException(status_code=404, detail="Foro no encontrado")

    return ForumCollection(forums=await collection.find().to_list(1000))


app.include_router(router)

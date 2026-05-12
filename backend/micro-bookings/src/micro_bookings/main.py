from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel, Field, BeforeValidator, ConfigDict
from typing import List, Annotated
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv, find_dotenv
import os
from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select


load_dotenv(dotenv_path=find_dotenv())

HOST = os.getenv("POSTGRES_SERVER")
USER = os.getenv("POSTGRES_USER")
PASSWORD = os.getenv("POSTGRES_PASSWORD")
DATABASE = os.getenv("POSTGRES_DB")
PORT = os.getenv("POSTGRES_PORT")

DATABASE_URL = f"postgresql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"


origins = [
    "http://localhost:4321",
    "https://front.localhost",
    "https://tfc.localhost",
    "http://127.0.0.1:4321",
]

app = FastAPI(
    docs_url="/bookings/docs",
    redoc_url="/bookings/redocs",
    openapi_url="/bookings/openapi.json",
    title="Microservicio reservas",
    version="0.0.1",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter(prefix="/bookings/api/v1")


class Booking(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(default=None)
    bike_id: str = Field(default=None)
    start_date: str = Field(default=None)
    end_date: str = Field(default=None)


engine = create_engine(DATABASE_URL)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@router.get("/", response_model=List[Booking], tags=["Get All Bookings"])
async def read_bookings(
    session: SessionDep, offset: int = 0, limit: int = 100
) -> List[Booking]:
    bookings = session.exec(select(Booking).offset(offset).limit(limit)).all()
    return bookings


@router.get("/{booking_id}", response_model=Booking, tags=["Get Booking by ID"])
async def read_booking(booking_id: int, session: SessionDep):
    booking = session.get(Booking, booking_id)
    if booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@router.get(
    "/user/{user_id}", response_model=List[Booking], tags=["Get Bookings by user"]
)
async def get_bookings_by_user(user_id: int, session: SessionDep) -> List[Booking]:
    bookings = session.exec(select(Booking).where(Booking.user_id == user_id)).all()
    if bookings is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    return bookings


@router.post("/", response_model=Booking, tags=["Create Booking"])
async def create_booking(booking: Booking, session: SessionDep):
    session.add(booking)
    session.commit()
    session.refresh(booking)
    return booking


@router.delete("/{booking_id}", tags=["Delete Booking by ID"])
async def delete_booking(booking_id: int, session: SessionDep):
    booking = session.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    session.delete(booking)
    session.commit()
    return {"message": "Booking deleted successfully"}


app.include_router(router)

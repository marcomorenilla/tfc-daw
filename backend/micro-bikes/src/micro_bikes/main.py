from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware


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


@router.get("/", response_model=str, tags=["Listar bicicletas"])
async def root():
    return {"message": "Hello World"}


app.include_router(router)

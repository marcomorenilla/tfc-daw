from pydantic import BaseModel, EmailStr, Field, ConfigDict

"""
Esquemas de la API
"""


class User(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=3, max_length=50)
    surname: str = Field(..., min_length=3, max_length=100)
    phone: str = Field(..., min_length=1, max_length=10)
    disabled: bool = True
    is_superuser: bool = False


class UserCreate(User):
    password: str


class UserUpdate(User):
    password: str


class UserInDB(User):
    id: int
    hashed_password: str


class UserSchema(User):
    id: int
    model_config = ConfigDict(from_attributes=True)


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserSchema


class TokenData(BaseModel):
    id: str | None = None
    name: str | None = None
    email: str | None = None
    admin: bool | None = None
    phone: str | None = None
    disabled: bool | None = None
    model_config = ConfigDict(from_attributes=True)

from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional

class User(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=3, max_length=50)
    surname: str = Field(..., min_length=3, max_length=100)   
    phone: str = Field(..., pattern=r"^\+?(\d{1,3})?[\s-]?\d{9,20}$")
    disabled: bool = True
    is_superuser: bool = False

class UserInDB(User):
    password: str = Field(..., min_length=8)

class UserSchema(User):
    id: int

    model_config = ConfigDict(from_attributes=True)
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from micro_users.db.session import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(70), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[str] = mapped_column(String(50), index=True, nullable=False)
    surname: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    phone: Mapped[str] = mapped_column(String(20), index=True, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_superuser: Mapped[bool] = mapped_column(Boolean, default=False)

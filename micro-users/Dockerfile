FROM python:3.12-slim 

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

ENV PYTHONPYCACHEPREFIX=.cache/cpython/
ENV PYTHONDONTWRITEBYTECODE=1

COPY ./shared-utils ./shared-utils

COPY ./micro-users ./micro-users

WORKDIR /app/micro-users

RUN uv sync --frozen --no-cache

EXPOSE 8000

CMD [ "uv", "run", "uvicorn", "micro_users.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
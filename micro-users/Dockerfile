FROM python:3.12-slim 

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

COPY ./shared-utils ./shared-utils

COPY ./micro-users ./micro-users

WORKDIR /app/micro-users

RUN uv sync --frozen --no-cache


EXPOSE 8000

CMD ["/bin/sh"]
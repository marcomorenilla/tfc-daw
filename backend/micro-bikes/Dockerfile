FROM python:3.12-slim 

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

RUN groupadd -g 1000 appgroup && \
    useradd -u 1000 -g appgroup -m appuser

WORKDIR /app

ENV PYTHONPYCACHEPREFIX=.cache/cpython/
ENV PYTHONDONTWRITEBYTECODE=1
ENV UV_PROJECT_ENVIRONMENT=/app/micro-bikes/.venv

RUN chown appuser:appgroup /app
USER appuser

COPY --chown=appuser:appgroup ./micro-bikes ./micro-bikes

WORKDIR /app/micro-bikes

RUN uv sync --frozen --no-cache

EXPOSE 8000

CMD [ "uv", "run", "uvicorn", "micro_bikes.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
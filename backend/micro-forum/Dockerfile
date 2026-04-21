FROM python:3.12-slim 

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

RUN groupadd -g 1000 appgroup && \
    useradd -u 1000 -g appgroup -m appuser

WORKDIR /app

ENV PYTHONPYCACHEPREFIX=.cache/cpython/
ENV PYTHONDONTWRITEBYTECODE=1
ENV UV_PROJECT_ENVIRONMENT=/app/micro-forum/.venv
ENV PYTHONPATH=$PYTHONPATH:/app/micro-forum/src

RUN chown appuser:appgroup /app
USER appuser

COPY --chown=appuser:appgroup ./micro-forum ./micro-forum

WORKDIR /app/micro-forum

RUN uv sync --frozen --no-cache

EXPOSE 8000

CMD [ "uv", "run", "uvicorn", "micro_forum.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
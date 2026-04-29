FROM python:3.12-slim 

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

RUN groupadd -g 1000 appgroup && \
    useradd -u 1000 -g appgroup -m appuser

WORKDIR /app

ENV PYTHONPYCACHEPREFIX=.cache/cpython/
ENV PYTHONDONTWRITEBYTECODE=1
ENV UV_PROJECT_ENVIRONMENT=/app/micro-bookings/.venv
ENV PYTHONPATH=$PYTHONPATH:/app/micro-bookings/src

RUN chown appuser:appgroup /app
USER appuser

COPY --chown=appuser:appgroup ./micro-bookings ./micro-bookings

WORKDIR /app/micro-bookings

RUN uv sync --frozen --no-cache

EXPOSE 8000

CMD [ "uv", "run", "uvicorn", "micro_bookings.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
"""Moviez Backend API."""
from pathlib import Path

from dotenv import load_dotenv

# Load root .env (project root) so frontend and backend share the same file
_root = Path(__file__).resolve().parent.parent
load_dotenv(_root / ".env")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import health, data, charts, proxy, auth, users

app = FastAPI(
    title="Moviez API",
    description="Backend API for Moviez streaming discovery platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3005"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/health", tags=["health"])
app.include_router(data.router, prefix="/api/v1", tags=["data"])
app.include_router(charts.router, prefix="/api/v1", tags=["charts"])
app.include_router(proxy.router, prefix="/api/v1", tags=["proxy"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])


@app.get("/")
async def root():
    return {"message": "Moviez API", "docs": "/docs"}

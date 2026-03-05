"""User stub routes - proxy for auth; implement as needed."""
from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.post("")
async def create_user():
    raise HTTPException(
        status_code=501,
        detail="Auth not implemented. Add user storage to enable registration.",
    )


@router.post("/login")
async def login():
    raise HTTPException(
        status_code=501,
        detail="Auth not implemented. Add user storage to enable login.",
    )


@router.get("/me")
async def me():
    raise HTTPException(
        status_code=501,
        detail="Auth not implemented. Add JWT/session handling for /me.",
    )

"""Auth stub routes - implement with your preferred backend (DB, etc.)."""
from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.post("/signup")
async def signup():
    raise HTTPException(
        status_code=501,
        detail="Auth not implemented. Add user storage (DB, Supabase, etc.) to enable signup.",
    )


@router.post("/login")
async def login():
    raise HTTPException(
        status_code=501,
        detail="Auth not implemented. Add user storage to enable login.",
    )

"""
Vercel serverless handler for FastAPI backend.
Handles /api/v1/* routes (except /api/v1/recommendations which stays with Next.js).
"""
import os
import sys

# Add frontend/backend to path so "from routes import" in main.py resolves to backend/routes
_here = os.path.dirname(os.path.abspath(__file__))
_root = os.path.abspath(os.path.join(_here, "..", ".."))
_backend_dir = os.path.join(_root, "backend")
if _backend_dir not in sys.path:
    sys.path.insert(0, _backend_dir)

# Ensure backend loads .env from the right place
os.chdir(_backend_dir)

from main import app

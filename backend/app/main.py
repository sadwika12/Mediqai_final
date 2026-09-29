"""
MediQAI backend — FastAPI.

Currently serves the same dummy data the frontend seeds into
localStorage (see app/data/seed.py), through routes that already match
the shape the frontend's api/client.js expects. The frontend does not
call this yet (it runs fully client-side per the "storage: local
storage" requirement) — this backend exists so the next steps are drop-in:

  * Real database  -> app/database.py
  * Real ML model  -> app/services/model.py
  * Wire frontend  -> frontend/src/api/client.js (point BASE_URL here,
                       swap storage.js imports for client.js in App.jsx)

Run with:
    uvicorn app.main:app --reload
Then open http://localhost:8000/docs for interactive API docs.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, users, predict, records

app = FastAPI(
    title="MediQAI API",
    description="Hybrid quantum-classical health screening — API layer",
    version="0.1.0",
)

# Allow the Vite dev server (and any other origin, for now) to call this API.
# Tighten this to your real frontend origin before deploying.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(predict.router, prefix="/api")
app.include_router(records.router, prefix="/api")


@app.get("/api/health")
def health_check():
    return {"status": "ok"}

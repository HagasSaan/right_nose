from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .main_endpoints import router as main_router
from .ws_endpoints import router as ws_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(main_router)
app.include_router(ws_router)

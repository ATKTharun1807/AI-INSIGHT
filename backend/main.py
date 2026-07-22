from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import auth, datasets, analysis

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="InsightAI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(datasets.router)
app.include_router(analysis.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to InsightAI API"}


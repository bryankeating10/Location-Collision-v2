from fastapi import FastAPI
from app.db.db import get_session

app = FastAPI()

@app.get("/")
def root():
    return {"message":"Location Collision v2 API running"}
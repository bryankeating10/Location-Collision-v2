from fastapi import FastAPI
from app.db.db import get_session

app = FastAPI()

@app.get("/")
def root():
    return {"message":"Location Collision v2 API running"}

from app.db.db import engine

@app.get("/db-test")
def db_test():
    conn = engine.connect()
    conn.close()
    return {"status": "database connected"}
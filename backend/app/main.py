from fastapi import FastAPI
from app.db.db import engine, Base
from app.db import models

app = FastAPI()

print(Base.metadata.tables)

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message":"Location Collision v2 API running"}

@app.get("/db-test")
def db_test():
    conn = engine.connect()
    conn.close()
    return {"status": "database connected"}
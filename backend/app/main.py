from fastapi import FastAPI
from app.db.db import engine, Base
from app.db import models

from app.api import quants, testers, casinos, accounts, locations, actions

app = FastAPI()

Base.metadata.create_all(bind=engine)

# Include API endpoint routers
app.include_router(quants.router)
app.include_router(testers.router)
app.include_router(casinos.router)
app.include_router(accounts.router)
app.include_router(locations.router)
app.include_router(actions.router)


@app.get("/")
def root():
    return {"message":"Location Collision v2 API running"}

@app.get("/db-test")
def db_test():
    conn = engine.connect()
    conn.close()
    return {"status": "database connected"}
from fastapi import FastAPI
from app.db.db import engine, Base
from app.db import models

from app.api import quants, testers, casinos, accounts, locations, actions

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",  # add this
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
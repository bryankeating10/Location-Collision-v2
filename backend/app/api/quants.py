from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.db import get_session
from app.services.quant_service import create_quant, list_quants

router = APIRouter(prefix="/quants", tags=["quants"])

@router.post("/")
def create_quant_endpoint(name:str, db: Session = Depends(get_session)):
    return create_quant(db, name)

@router.get("/")
def list_quants_endpoint(db: Session = Depends(get_session)):
    return list_quants(db)
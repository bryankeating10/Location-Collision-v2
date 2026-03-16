from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.db import get_session
from app.services.quant_service import create_quant, get_quants

router = APIRouter(prefix="/quants", tags=["quants"])

@router.post("/")
def create_quant(name:str, db: Session = Depends(get_session)):
    return create_quant(db=db, name=name)

@router.get("/")
def list_quants(db: Session = Depends(get_session)):
    return get_quants(db=db)
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.db import get_session
from app.db.models import Quant

router = APIRouter(prefix="/quants", tags=["quants"])

@router.post("/")
def create_quant(name:str, session: Session = Depends(get_session)):
    quant = Quant(name=name)
    session.add(quant)
    session.commit()
    session.refresh(quant)
    return quant

@router.get("/")
def list_quants(session: Session = Depends(get_session)):
    return session.query(Quant).all()
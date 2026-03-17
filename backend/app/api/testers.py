from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.db import get_session
from app.services.tester_service import create_tester, list_testers

router = APIRouter(prefix="/testers", tags=["testers"])

@router.post("/")
def create_tester_endpoint(name: str, assigned_quant: int, db: Session = Depends(get_session)):
    return create_tester(db, name, assigned_quant)

@router.get("/")
def list_testers_endpoint(db: Session = Depends(get_session)):
    return list_testers(db)
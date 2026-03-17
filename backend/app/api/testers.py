from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.db import get_session
from app.services.tester_service import create_tester, delete_tester, list_testers

router = APIRouter(prefix="/testers", tags=["testers"])

@router.post("/")
def create_tester_endpoint(name: str, assigned_quant: int, db: Session = Depends(get_session)):
    return create_tester(db, name, assigned_quant)

@router.delete("/{tester_id}")
def delete_tester_endpoint(tester_id: int, db: Session = Depends(get_session)):
    tester = delete_tester(tester_id, db)
    if not tester:
        raise HTTPException(status_code=404, detail="Tester not found")
    return {"message": f"Tester {tester_id} deleted successfully"}

@router.get("/")
def list_testers_endpoint(db: Session = Depends(get_session)):
    return list_testers(db)
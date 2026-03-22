from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db.db import get_session
from ..services.casino_service import create_casino, update_casino, delete_casino, list_casinos
from ..schemas.casinos import CasinoCreate, CasinoUpdate, CasinoResponse

router = APIRouter(prefix="/casinos", tags=["casinos"])

@router.post("/")
def create_casino_endpoint(casino_data: CasinoCreate, db: Session = Depends(get_session)):
    return create_casino(casino_data, db)

@router.put("/{casino_id}")
def update_casino_endpoint(id: int, casino_data: CasinoUpdate, db: Session = Depends(get_session)):
    updated = update_casino(id, casino_data, db)
    if not updated:
        raise HTTPException(status_code=404, detail='Casino not found')
    return updated

@router.delete("/{casino_id}")
def delete_casino_endpoint(casino_id: int, db: Session = Depends(get_session)):
    casino = delete_casino(casino_id, db)
    if not casino:
        raise HTTPException(status_code=404, detail="Casino not found")
    return {"message": f"Casino {casino_id} deleted successfully"}

@router.get("/", response_model=list[CasinoResponse])
def list_casinos_endpoint(db: Session = Depends(get_session)):
    return list_casinos(db)
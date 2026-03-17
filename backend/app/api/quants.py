from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.db import get_session
from app.services.quant_service import create_quant, delete_quant, list_quants
from app.schemas.quants import QuantResponse

router = APIRouter(prefix="/quants", tags=["quants"])

@router.post("/")
def create_quant_endpoint(name:str, db: Session = Depends(get_session)):
    return create_quant(name,db)

@router.delete("/{quant_id}")
def delete_quant_endpoint(quant_id: int, db: Session = Depends(get_session)):
    quant = delete_quant(quant_id, db)
    if not quant:
        raise HTTPException(status_code=404, detail="Quant not found")
    return {"message": f"Quant {quant_id} deleted successfully"}

@router.get("/", response_model=list[QuantResponse])
def list_quants_endpoint(db: Session = Depends(get_session)):
    return list_quants(db)
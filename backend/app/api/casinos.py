from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.db import get_session
from app.services.casino_service import create_casino, list_casinos

router = APIRouter(prefix="/casinos", tags=["casinos"])

@router.post("/")
def create_casino_endpoint(name:str, network: str, active: bool, signup_rest: bool, /
                            deposit_rest: bool, play_rest: bool, withdrawal_rest: bool, /
                            network_rest: bool, db: Session = Depends(get_session)):
    return create_casino(name, network, active, signup_rest, deposit_rest, \
                         play_rest, withdrawal_rest, network_rest, db)

@router.get("/")
def list_casinos_endpoint(db: Session = Depends(get_session)):
    return list_casinos(db)
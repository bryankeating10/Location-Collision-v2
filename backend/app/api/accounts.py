from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.db import get_session
from app.services.account_service import create_account, list_accounts

router = APIRouter(prefix="/accounts", tags=["accounts"])

@router.post("/")
def create_account_endpoint(tester_id: int, casino_id: int, username: str = None, db: Session = Depends(get_session)):
    return create_account(tester_id, casino_id, username, db)

router.get("/")
def list_accounts_endpoint(db: Session = Depends(get_session)):
    return list_accounts(db)
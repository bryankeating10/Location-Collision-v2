from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.db import get_session
from app.services.account_service import create_account, delete_account, list_accounts
from app.schemas.accounts import AccountResponse

router = APIRouter(prefix="/accounts", tags=["accounts"])

@router.post("/")
def create_account_endpoint(tester_id: int, casino_id: int, username: str = None, db: Session = Depends(get_session)):
    return create_account(tester_id, casino_id, username, db)

@router.delete("/{account_id}")
def delete_account_endpoint(account_id: int, db: Session = Depends(get_session)):
    account = delete_account(account_id, db)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    return {"message": f"Account {account_id} deleted successfully"}

@router.get("/", response_model=list[AccountResponse])
def list_accounts_endpoint(db: Session = Depends(get_session)):
    return list_accounts(db)
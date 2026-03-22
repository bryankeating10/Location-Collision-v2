from sqlalchemy.orm import Session
from ..db.models import Account

def create_account(tester_id: int, casino_id: int, username: str, db: Session):
    account = Account(tester_id=tester_id, casino_id=casino_id, username=username)
    db.add(account)
    db.commit()
    db.refresh(account)
    return account

def list_accounts(db: Session):
    return db.query(Account).all()

def delete_account(id: int, db: Session):
    account = db.query(Account).where(Account.id == id).first()
    if not account:
        return None
    db.delete(account)
    db.commit()
    return account
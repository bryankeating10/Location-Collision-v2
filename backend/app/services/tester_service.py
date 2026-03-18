from sqlalchemy.orm import Session
from app.db.models import Tester, Casino, Account

def create_tester(name: str, assigned_quant: int, db: Session):
    # Create tester
    tester = Tester(name=name,assigned_quant=assigned_quant)
    db.add(tester)
    db.flush()

    # Fetch all casinos
    casinos = db.query(Casino).all()

    # Create accounts for each casino
    accounts = [
        Account(
            tester_id=tester.id,
            casino_id=casino.id
            )
        for casino in casinos
    ]
    db.add_all(accounts)

    db.commit()
    db.refresh(tester)
    return tester

def list_testers(db:Session):
    return db.query(Tester).all()

def delete_tester(id: int, db: Session):
    tester = db.query(Tester).where(Tester.id == id).first()
    if not tester:
        return None
    db.delete(tester)
    db.commit()
    return tester
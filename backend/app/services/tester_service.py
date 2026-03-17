from sqlalchemy.orm import Session
from app.db.models import Tester

def create_tester(name: str, assigned_quant: int, db: Session):
    tester = Tester(name=name,assigned_quant=assigned_quant)
    db.add(tester)
    db.commit()
    db.refresh(tester)
    return tester

def list_testers(db:Session):
    return db.query(Tester).all()
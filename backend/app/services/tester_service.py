from sqlalchemy.orm import Session
from app.db.models import Tester

def create_tester(db: Session, name: str, assigned_quant: int):
    tester = Tester(name=name,assigned_quant=assigned_quant)
    db.add(tester)
    db.commit()
    db.refresh(tester)
    return tester

def get_testers(db:Session):
    return db.query(Tester).all()

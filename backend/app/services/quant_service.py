from sqlalchemy.orm import Session
from app.db.models import Quant

def create_quant(name: str, db: Session):
    quant = Quant(name=name)
    db.add(quant)
    db.commit()
    db.refresh(quant)
    return quant

def list_quant(db: Session):
    db.query(Quant).all()
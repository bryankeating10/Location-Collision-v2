from sqlalchemy.orm import Session
from app.db.models import Quant

def create_quant(db: Session, name: str):
    quant = Quant(name=name)
    db.add(quant)
    db.commit()
    db.refresh(quant)
    return quant

def get_quant(db: Session):
    db.query(Quant).all()
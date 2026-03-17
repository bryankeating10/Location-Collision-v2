from sqlalchemy.orm import Session
from app.db.models import Quant

def create_quant(name: str, db: Session):
    quant = Quant(name=name)
    db.add(quant)
    db.commit()
    db.refresh(quant)
    return quant

def list_quants(db: Session):
    return db.query(Quant).all()

def delete_quant(id: int, db: Session):
    quant = db.query(Quant).filter(Quant.id == id).first()
    if not quant:
        return None
    db.delete(quant)
    db.commit()
    return quant

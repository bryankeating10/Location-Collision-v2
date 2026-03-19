from sqlalchemy.orm import Session
from app.db.models import Casino
from app.schemas.casinos import CasinoCreate, CasinoUpdate, CasinoResponse

def create_casino(casino_data: CasinoCreate, db: Session):
    casino = Casino(**casino_data.model_dump())
    db.add(casino)
    db.commit()
    db.refresh(casino)
    return casino

def update_casino(id: int, casino_data: CasinoUpdate, db: Session):
    casino = db.query(Casino).where(Casino.id == id).first()
    if not casino:
        return None
    for field, value in casino_data.model_dump().items():
        setattr(casino, field, value)
    db.add(casino)
    db.commit()
    return casino


def list_casinos(db: Session):
    return db.query(Casino).all()

def delete_casino(id: int, db: Session):
    casino = db.query(Casino).where(Casino.id == id).first()
    if not casino:
        return None
    db.delete(casino)
    db.commit()
    return casino
from sqlalchemy.orm import Session
from app.db.models import Casino
from app.schemas.casinos import CasinoCreate, CasinoUpdate, CasinoResponse

def create_casino(name: str, network: str, active: bool, signup_rest: bool, \
                  deposit_rest: bool, play_rest: bool, withdrawal_rest: bool, \
                  network_rest: bool, db: Session):
    casino = Casino(name=name, network=network, active=active,
                    signup_rest=signup_rest, deposit_rest=deposit_rest, \
                    play_rest=play_rest, withdrawal_rest=withdrawal_rest, \
                        network_rest=network_rest)
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
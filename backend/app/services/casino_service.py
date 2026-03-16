from sqlalchemy.orm import Session
from app.db.models import Casino

def create_casino(db: Session, name: str, network: str, active: bool, \
                  signup_rest: bool, deposit_rest: bool, play_rest: bool, \
                    withdrawal_rest: bool, network_rest: bool):
    casino = Casino(name=name, network=network, active=active,
                    signup_rest=signup_rest, deposit_rest=deposit_rest, \
                    play_rest=play_rest, withdrawal_rest=withdrawal_rest, \
                        network_rest=network_rest)
    db.add(casino)
    db.commit()
    db.refresh(casino)
    return casino

def list_casinos(db: Session):
    return db.query(Casino).all()
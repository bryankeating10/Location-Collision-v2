from sqlalchemy.orm import Session
from app.db.models import Action

def create_action(category: str, account_id: int, location_id: int, magnitude: float, db: Session):
    action = Action(category=category, account_id=account_id, location_id=location_id, magnitude=magnitude)
    db.add(action)
    db.commit()
    db.refresh(action)
    return action

def list_actions(db: Session):
    return db.query(Action).all()
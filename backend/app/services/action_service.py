from sqlalchemy.orm import Session
from app.db.models import Action
from app.schemas.actions import ActionCreate, ActionUpdate

def create_action(action_data: ActionCreate, db: Session):
    action = Action(**action_data.model_dump())
    db.add(action)
    db.commit()
    db.refresh(action)
    return action

def update_action(id: int, action_data: ActionUpdate, db: Session):
    action = db.query(Action).where(Action.id == id).first()
    if not action:
        return None
    for field, value in action_data.model_dump().items():
        setattr(action, field, value)
    return action

def list_actions(db: Session):
    return db.query(Action).all()

def delete_action(id: int, db: Session):
    action = db.query(Action).where(Action.id == id).first()
    if not action:
        return None
    db.delete(action)
    db.commit()
    return action
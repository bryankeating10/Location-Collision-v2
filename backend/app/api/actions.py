from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.db import get_session
from app.services.action_service import create_action, delete_action, list_actions

router = APIRouter(prefix="/actions", tags=["actions"])

@router.post("/")
def create_action_endpoint(category:str, account_id: int, location_id: int, \
                           magnitude: float = None, db: Session = Depends(get_session)):
    return create_action(category, account_id, location_id, magnitude, db)

@router.delete("/{action_id}")
def delete_action_endpoint(action_id: int, db: Session = Depends(get_session)):
    action = delete_action(db, action_id)
    if not action:
        raise HTTPException(status_code=404, detail="Action not found")
    return {"message": f"Action {action_id} deleted successfully"}

@router.get("/")
def list_actions_endpoint(db: Session = Depends(get_session)):
    return list_actions(db)
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.db import get_session
from app.services.action_service import create_action, update_action, delete_action, list_actions
from app.schemas.actions import ActionCreate, ActionUpdate, ActionResponse

router = APIRouter(prefix="/actions", tags=["actions"])

@router.post("/")
def create_action_endpoint(action_data: ActionCreate, db: Session = Depends(get_session)):
    return create_action(action_data, db)

@router.put("/{action_id}")
def update_action_endpoint(id: int, action_data: ActionUpdate, db: Session = Depends(get_session)):
    updated = update_action(id, action_data, db)
    if not updated:
        return HTTPException(status_code=404, detail="Action not found")
    return updated

@router.delete("/{action_id}")
def delete_action_endpoint(action_id: int, db: Session = Depends(get_session)):
    action = delete_action(action_id, db)
    if not action:
        raise HTTPException(status_code=404, detail="Action not found")
    return {"message": f"Action {action_id} deleted successfully"}

@router.get("/", response_model=list[ActionResponse])
def list_actions_endpoint(db: Session = Depends(get_session)):
    return list_actions(db)
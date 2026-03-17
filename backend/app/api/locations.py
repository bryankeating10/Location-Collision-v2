from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.db import get_session
from app.services.location_service import create_location, list_locations

router = APIRouter(prefix="/locations", tags=["locations"])

@router.post("/")
def create_location_endpoint(name:str, latitude: float, longitude: float, db: Session = Depends(get_session)):
    return create_location(name, latitude, longitude, db)

@router.get("/")
def list_locations_endpoint(db: Session = Depends(get_session)):
    return list_locations(db)
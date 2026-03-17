from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.db import get_session
from app.services.location_service import create_location, delete_location, list_locations

router = APIRouter(prefix="/locations", tags=["locations"])

@router.post("/")
def create_location_endpoint(name:str, latitude: float, longitude: float, db: Session = Depends(get_session)):
    return create_location(name, latitude, longitude, db)

@router.delete("/{location_id}")
def delete_location_endpoint(location_id: int, db: Session = Depends(get_session)):
    location = delete_location(location_id, db)
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    return {"message": f"Location {location_id} deleted successfully"}

@router.get("/")
def list_locations_endpoint(db: Session = Depends(get_session)):
    return list_locations(db)
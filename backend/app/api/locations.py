from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db.db import get_session
from ..services.location_service import create_location, update_location, delete_location, list_locations
from ..schemas.locations import LocationCreate, LocationUpdate, LocationResponse

router = APIRouter(prefix="/locations", tags=["locations"])

@router.post("/")
def create_location_endpoint(location_data: LocationCreate, db: Session = Depends(get_session)):
    return create_location(location_data, db)

@router.put('/{location_id}')
def update_location_endpoint(id: int, location_data: LocationUpdate, db: Session = Depends(get_session)):
    updated = update_location(id, location_data, db)
    if not updated:
        return HTTPException(status_code=404, detail='Location not found')
    return updated

@router.delete("/{location_id}")
def delete_location_endpoint(location_id: int, db: Session = Depends(get_session)):
    location = delete_location(location_id, db)
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    return {"message": f"Location {location_id} deleted successfully"}

@router.get("/", response_model=list[LocationResponse])
def list_locations_endpoint(db: Session = Depends(get_session)):
    return list_locations(db)
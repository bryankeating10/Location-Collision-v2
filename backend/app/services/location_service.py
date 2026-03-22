from sqlalchemy.orm import Session
from ..db.models import Location
from ..schemas.locations import LocationCreate, LocationUpdate

def create_location(location_data: LocationCreate, db: Session):
    location = Location(**location_data.model_dump())
    db.add(location)
    db.commit()
    db.refresh(location)
    return location

def update_location(id: int, location_data: LocationUpdate, db: Session):
    location = db.query(Location).where(Location.id == id).first()
    if not location:
        return None
    for field, value in location_data.model_dump().items():
        setattr(location, field, value)
    db.add(location)
    db.commit()
    return location

def list_locations(db: Session):
    return db.query(Location).all()

def delete_location(id: int, db: Session):
    location = db.query(Location).where(Location.id == id).first()
    if not location:
        return None
    db.delete(location)
    db.commit()
    return location
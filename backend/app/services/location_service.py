from sqlalchemy.orm import Session
from app.db.models import Location
from app.schemas.locations import LocationCreate, LocationUpdate

def create_location(location_data: LocationCreate, db: Session):
    location = Location(**location_data.model_dump())
    db.add(location)
    db.commit()
    db.refresh(location)
    return location

def update_location(id: int, location_data: LocationUpdate, db: Session):
    update = db.query(Location).where(Location.id == id).first()
    if not update:
        return None
    for field, value in location_data.model_dump().items():
        setattr(update, field, value)
    db.add(update)
    db.commit()
    return update

def list_locations(db: Session):
    return db.query(Location).all()

def delete_location(id: int, db: Session):
    location = db.query(Location).where(Location.id == id).first()
    if not location:
        return None
    db.delete(location)
    db.commit()
    return location
from sqlalchemy.orm import Session
from app.db.models import Location

def create_location(name: str, latitude: float, longitude: float, db: Session):
    location = Location(name=name, latitude=latitude, longitude=longitude)
    db.add(location)
    db.commit()
    db.refresh(location)
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
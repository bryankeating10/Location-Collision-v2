# app/api/availability.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.db import get_session
from app.services.availability_service import get_availability_profile
from app.schemas.availability import AvailabilityResponse

router = APIRouter(prefix="/availability", tags=["availability"])


@router.get("/", response_model=AvailabilityResponse)
def availability(tester_id: int, location_id: int, db: Session = Depends(get_session)):
    """
    Returns the availability profile of all accounts for a given tester at a given location.
    """
    try:
        profile = get_availability_profile(db, tester_id, location_id)
        return profile
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
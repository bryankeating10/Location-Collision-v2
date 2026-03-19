from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class LocationCreate(BaseModel):
    name: str
    latitude: float
    longitude: float

class LocationUpdate(BaseModel):
    name: str
    latitude: float
    longitude: float

class LocationResponse(BaseModel):
    id: int
    name: str
    latitude: float
    longitude: float
    updated_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True
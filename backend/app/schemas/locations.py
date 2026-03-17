from pydantic import BaseModel
from datetime import datetime

class LocationResponse(BaseModel):
    id: int
    name: str
    latitude: float
    longitude: float
    created_at: datetime

    class Config:
        from_attributes = True
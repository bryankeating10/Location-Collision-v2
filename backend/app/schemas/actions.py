from pydantic import BaseModel
from datetime import datetime

class ActionResponse(BaseModel):
    id: int
    category: str
    magnitude: float
    account_id: int
    location_id: int
    created_at: datetime

    class Config:
        from_attributes = True
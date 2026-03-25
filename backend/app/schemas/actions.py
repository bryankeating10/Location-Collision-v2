from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ActionCreate(BaseModel):
    category: str
    magnitude: Optional[float] = None
    account_id: int
    location_id: int

# Commented out below because I'm not convinced I'm getting it conceptually correct
class ActionUpdate(BaseModel):
    # category: str
    magnitude: Optional[float] = None
    # account_id: int
    # location_id: int

class ActionResponse(BaseModel):
    id: int
    category: str
    magnitude: Optional[float] = None
    account_id: int
    location_id: int
    performed_at: datetime

    class Config:
        from_attributes = True
from pydantic import BaseModel
from typing import List, Optional

class CasinoAvailability(BaseModel):
    casino_id: int
    casino_name: str
    available: bool
    conflicting_action_id: Optional[int] = None

class AvailabilityResponse(BaseModel):
    tester_id: int
    location_id: int
    availability: List[CasinoAvailability]
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class AccountResponse(BaseModel):
    id: int
    username: Optional[str] = None
    tester_id: int
    casino_id: int
    created_at: datetime

    class Config:
        from_attributes = True
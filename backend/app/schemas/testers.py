from pydantic import BaseModel
from datetime import datetime

class TesterResponse(BaseModel):
    id: int
    name: str
    assigned_quant: int
    created_at: datetime

    class Config:
        from_attributes = True
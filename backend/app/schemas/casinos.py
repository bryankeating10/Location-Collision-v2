from pydantic import BaseModel
from datetime import datetime

class CasinoCreate(BaseModel):
    name: str
    network: str
    active: bool
    signup_rest: bool
    deposit_rest: bool
    play_rest: bool
    withdrawal_rest: bool
    network_rest: bool

class CasinoUpdate(BaseModel):
    name: str
    network: str
    active: bool
    signup_rest: bool
    deposit_rest: bool
    play_rest: bool
    withdrawal_rest: bool
    network_rest: bool

class CasinoResponse(BaseModel):
    id: int
    name: str
    network: str
    active: bool
    signup_rest: bool
    deposit_rest: bool
    play_rest: bool
    withdrawal_rest: bool
    network_rest: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
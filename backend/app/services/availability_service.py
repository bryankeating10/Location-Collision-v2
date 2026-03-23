# app/services/availability_service.py

from sqlalchemy.orm import Session
from typing import List

from app.schemas.availability import AvailabilityResponse, CasinoAvailability
from app.db.models import Action, Account, Casino


def get_availability_profile(db: Session, tester_id: int, location_id: int) -> AvailabilityResponse:
    """
    Compute availability for all accounts of a given tester at a specific location.
    True = collision (another tester has performed an action at that location for that casino)
    False = available
    """
    # 1️⃣ Get all accounts for this tester
    tester_accounts: List[Account] = db.query(Account).filter(Account.tester_id == tester_id).all()

    # 2️⃣ Get all actions at this location performed by other testers
    conflicting_actions: List[Action] = (
        db.query(Action)
        .join(Account)  # Join Action -> Account
        .filter(
            Action.location_id == location_id,
            Account.tester_id != tester_id
        )
        .all()
    )

    # 3️⃣ Build a set of casino_ids that are in conflict
    conflicting_casino_ids = {action.account.casino_id for action in conflicting_actions}

    # 4️⃣ Construct availability objects
    availability_list: List[CasinoAvailability] = []
    for account in tester_accounts:
        is_collision = account.casino_id in conflicting_casino_ids
        # If there’s a collision, grab one conflicting action id (optional)
        conflicting_action_id = None
        if is_collision:
            for action in conflicting_actions:
                if action.account.casino_id == account.casino_id:
                    conflicting_action_id = action.id
                    break

        availability_list.append(
            CasinoAvailability(
                casino_id=account.casino_id,
                casino_name=account.casino.name,
                available=not is_collision,  # True means available
                conflicting_action_id=conflicting_action_id
            )
        )

    # 5️⃣ Return structured response
    return AvailabilityResponse(
        tester_id=tester_id,
        location_id=location_id,
        availability=availability_list
    )
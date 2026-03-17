from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from .db import Base
from datetime import datetime

class Quant(Base):
    __tablename__ = 'quants'

    # Identification
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    # Relationships
    testers = relationship('Tester',back_populates='quant')
    
    # Time stamps
    created_at = Column(DateTime, default=datetime.now(),nullable=False)

class Tester(Base):
    __tablename__ = 'testers'

    # Identification
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    # Information
    assigned_quant = Column(Integer, ForeignKey('quants.id'))

    # Relationships
    quant = relationship('Quant',back_populates='testers')
    accounts = relationship('Account',back_populates='tester')

    # Time stamp
    created_at = Column(DateTime, default=datetime.now(),nullable=False)

class Casino(Base):
    __tablename__ = 'casinos'

    # Identification
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    # Information
    network = Column(String(50), nullable=True)

    # Restriction profile
    signup_rest = Column(Boolean, nullable=False) 
    deposit_rest = Column(Boolean, nullable=False)
    play_rest = Column(Boolean, nullable=False)
    withdrawal_rest = Column(Boolean, nullable=False)
    network_rest = Column(Boolean, nullable=False)
    active = Column(Boolean, nullable=True)
    updated_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.now(),nullable=False)
    
    # Relationships
    accounts = relationship("Account", back_populates='casino')

    # Time stamps
    created_at = Column(DateTime, default=datetime.now(),nullable=False)
    updated_at = Column(DateTime, nullable=True)

class Account(Base):
    __tablename__ = "accounts"

    # Identification
    id = Column(Integer,primary_key=True)

    # Information
    username = Column(String)
    tester_id = Column(Integer, ForeignKey('testers.id'))
    casino_id = Column(Integer, ForeignKey('casinos.id'))

    # Relationships
    tester = relationship("Tester", back_populates='accounts')
    casino = relationship("Casino", back_populates='accounts')
    actions = relationship("Action", back_populates='account')

    # Timestamp
    created_at = Column(DateTime, default=datetime.now(),nullable=False)

class Location(Base):
    __tablename__ = 'locations'

    # Identification
    id = Column(Integer,primary_key=True)
    name = Column(String, nullable=False)

    # Information
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    # Relationships
    actions = relationship("Action", back_populates='location')

    # Time stamp
    created_at = Column(DateTime, default=datetime.now(),nullable=False)
    updated_at = Column(DateTime, nullable=False)

class Action(Base):
    __tablename__ = 'actions'

    # Identification
    id = Column(Integer, primary_key=True, index=True)

    # Information
    """
    Categories:
        - signup: magnitude = null
        - deposit: magnitude = value
        - play: magnitude = null
        - withdrawal: magnitude = value
    """
    category = Column(String, nullable=False)
    magnitude = Column(Float, nullable=True)
    account_id = Column(Integer, ForeignKey('accounts.id'))
    location_id = Column(Integer, ForeignKey('locations.id'))

    # Relationships
    account = relationship("Account", back_populates='actions')
    location = relationship("Location", back_populates='actions')

    # Time stamp
    performed_at = Column(DateTime, nullable=False)
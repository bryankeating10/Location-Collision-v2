from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from .db import Base

class Quant(Base):
    __tablename__ = 'quants'

    # Identification
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    # Relationships
    testers = relationship('Tester',back_populates='quant')
    actions = relationship('Actions',back_populates='quant')

    # Time stamps
    created_at = Column(DateTime, nullable=False)

class Tester(Base):
    __tablename__ = 'testers'

    # Identification
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    # Information
    assigned_quant = Column(Integer, ForeignKey('quants.id'))

    # Relationships
    quants = relationship('Quant',back_populates='tester')
    accounts = relationship('Account',back_populates='tester')

    # Time stamp
    created_at = Column(DateTime, nullable=False)

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
    created_at = Column(DateTime, nullable=False)
    
    # Relationships
    accounts = relationship("Account", back_populates='casino')

    # Time stamps
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=True)

class Account(Base):
    __tablename__ = "accounts"

    # Identification
    id = Column(Integer,primary_key=True)

    # Information
    username = Column(String)
    tester_id = Column(Integer, ForeignKey('tester.id'))
    casino_id = Column(Integer, ForeignKey('casino.id'))

    # Relationships
    tester = relationship("Tester", back_populates='accounts')
    casino = relationship("Casino", back_populates='accounts')
    actions = relationship("Action", back_populates='account')

    # Timestamp
    created_at = Column(DateTime, nullable=False)

class Location(Base):
    __tablename__ = 'locations'

    # Identification
    id = Column(Integer,primary_key=True)
    name = Column(String, nullable=False)

    # Information
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    # Time stamp
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = 'postgresql+psycopg2://sunbird:sunbird@db:5432/sunbird_db'

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

def get_session():
    return SessionLocal()
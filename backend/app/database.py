"""
Database scaffold — NOT active yet.

The app currently runs entirely on the in-memory lists in
app/data/seed.py, which satisfies the assignment's current storage
requirement (client-side localStorage handles real persistence; this
in-memory store just gives the API something to serve). This file is
where you wire up a real database when that becomes the next milestone.

To activate:
  1. `pip install sqlalchemy psycopg2-binary` (see requirements.txt)
  2. Set a real DATABASE_URL below (Postgres, MySQL, or sqlite:///./mediqai.db
     for a zero-config local file).
  3. Define ORM models (User, PredictionRecord, DoctorReview) here.
  4. In app/data/seed.py, replace the list operations (find_user_by_email,
     add_record, etc.) with SQLAlchemy session queries — the function
     names/signatures can stay identical, so routers need no changes.
  5. Run `alembic init` for migrations once the schema stabilizes.
"""

# from sqlalchemy import create_engine, Column, String, Integer, JSON
# from sqlalchemy.orm import sessionmaker, declarative_base
#
# DATABASE_URL = "sqlite:///./mediqai.db"
# engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base = declarative_base()
#
#
# class User(Base):
#     __tablename__ = "users"
#     id = Column(String, primary_key=True)
#     name = Column(String, nullable=False)
#     email = Column(String, unique=True, nullable=False)
#     password = Column(String, nullable=False)  # hash this in real use!
#     role = Column(String, nullable=False)
#     specialty = Column(String, nullable=True)
#
#
# class PredictionRecord(Base):
#     __tablename__ = "records"
#     id = Column(String, primary_key=True)
#     user_id = Column(String, nullable=False)
#     disease_id = Column(String, nullable=False)
#     input_method = Column(String, nullable=False)
#     selected_ids = Column(JSON, nullable=False)
#     result = Column(JSON, nullable=False)
#     timestamp = Column(Integer, nullable=False)
#     doctor_review = Column(JSON, nullable=True)
#
#
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
#
#
# Base.metadata.create_all(bind=engine)

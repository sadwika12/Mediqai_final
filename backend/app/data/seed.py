"""
In-memory "database" seeded with the same dummy accounts and screening
history as the frontend's localStorage seed (see
frontend/src/utils/storage.js -> seedIfNeeded()).

This whole module is the thing to delete once a real database is wired
up. USERS and RECORDS are plain Python lists/dicts standing in for
database tables — swap them for SQLAlchemy queries (see
app/database.py) and every router below keeps working unchanged, since
they only call the helper functions at the bottom of this file.
"""

import time
import uuid

from app.services.model import predict


def _uid(prefix: str) -> str:
    return f"{prefix}_{uuid.uuid4().hex[:8]}"


USERS = [
    {"id": "u_admin", "name": "Admin", "email": "admin@mediqai.com", "password": "admin123", "role": "admin", "specialty": None},
    {"id": "u_doc1", "name": "Dr. Ananya Rao", "email": "doctor@mediqai.com", "password": "doctor123", "role": "doctor", "specialty": "General Physician"},
    {"id": "u_doc2", "name": "Dr. Sameer Khan", "email": "doctor2@mediqai.com", "password": "doctor123", "role": "doctor", "specialty": "Cardiologist"},
    {"id": "u_user1", "name": "Ravi Kumar", "email": "user@mediqai.com", "password": "user123", "role": "user", "specialty": None},
    {"id": "u_user2", "name": "Lakshmi Devi", "email": "lakshmi@mediqai.com", "password": "user123", "role": "user", "specialty": None},
]


def _mk_record(user_id, user_name, disease_id, selected_ids, method, days_ago, doctor_review=None):
    return {
        "id": _uid("rec"),
        "userId": user_id,
        "userName": user_name,
        "diseaseId": disease_id,
        "inputMethod": method,
        "selectedIds": selected_ids,
        "result": predict(disease_id, selected_ids),
        "timestamp": int(time.time() * 1000) - days_ago * 86400000,
        "doctorReview": doctor_review,
    }


RECORDS = [
    _mk_record("u_user1", "Ravi Kumar", "diabetes", ["freq_urination", "excess_thirst", "fatigue_d"], "form", 10,
               {"doctorId": "u_doc1", "doctorName": "Dr. Ananya Rao", "verdict": "agree",
                "comment": "Consistent with early-stage indicators."}),
    _mk_record("u_user1", "Ravi Kumar", "heart", ["chest_pain", "sob_h", "cold_sweats"], "chatbot", 5),
    _mk_record("u_user2", "Lakshmi Devi", "respiratory", ["wheezing", "sob_r", "persistent_cough"], "form", 3,
               {"doctorId": "u_doc2", "doctorName": "Dr. Sameer Khan", "verdict": "disagree",
                "comment": "Patient has diagnosed asthma already; model over-flagged as new onset."}),
    _mk_record("u_user2", "Lakshmi Devi", "kidney", ["fatigue_kd", "back_pain"], "upload", 1),
    _mk_record("u_user1", "Ravi Kumar", "neuro", ["severe_headache", "vision_change"], "form", 20,
               {"doctorId": "u_doc1", "doctorName": "Dr. Ananya Rao", "verdict": "agree",
                "comment": "Low risk correctly identified, migraine-pattern symptoms only."}),
]


# ---------------------------------------------------------------- helpers
def find_user_by_email(email: str):
    return next((u for u in USERS if u["email"] == email), None)


def find_user_by_id(user_id: str):
    return next((u for u in USERS if u["id"] == user_id), None)


def add_user(user: dict):
    USERS.append(user)
    return user


def list_records(user_id: str | None = None):
    if user_id:
        return [r for r in RECORDS if r["userId"] == user_id]
    return RECORDS


def add_record(record: dict):
    RECORDS.insert(0, record)
    return record


def find_record(record_id: str):
    return next((r for r in RECORDS if r["id"] == record_id), None)

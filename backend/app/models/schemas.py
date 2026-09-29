"""
Pydantic schemas for the API's request/response bodies.

Kept in one file for a project this size. If it grows, split by domain
(auth_schemas.py, record_schemas.py, ...) — nothing else needs to change
since routers import from `app.models.schemas`, not the file directly.
"""

from typing import Optional, Literal
from pydantic import BaseModel, EmailStr


Role = Literal["user", "doctor", "admin"]


class LoginRequest(BaseModel):
    email: str
    password: str


class SignupRequest(BaseModel):
    name: str
    email: str
    password: str
    role: Role = "user"
    specialty: Optional[str] = None


class UserOut(BaseModel):
    id: str
    name: str
    email: str
    role: Role
    specialty: Optional[str] = None


class PredictRequest(BaseModel):
    userId: str
    diseaseId: str
    inputMethod: Literal["chatbot", "form", "upload"]
    selectedIds: list[str]


class DoctorReview(BaseModel):
    doctorId: str
    doctorName: str
    verdict: Literal["agree", "disagree"]
    comment: str


class RecordOut(BaseModel):
    id: str
    userId: str
    userName: str
    diseaseId: str
    inputMethod: str
    selectedIds: list[str]
    result: dict
    timestamp: int
    doctorReview: Optional[DoctorReview] = None

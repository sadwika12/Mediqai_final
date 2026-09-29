from typing import Optional

from fastapi import APIRouter, HTTPException

from app.models.schemas import RecordOut, DoctorReview
from app.data.seed import list_records, find_record

router = APIRouter(prefix="/records", tags=["records"])


@router.get("", response_model=list[RecordOut])
def get_records(userId: Optional[str] = None):
    """
    No userId -> every record (doctor review queue / admin views).
    userId set -> just that patient's history page.
    """
    return list_records(userId)


@router.post("/{record_id}/review", response_model=RecordOut)
def save_review(record_id: str, review: DoctorReview):
    record = find_record(record_id)
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    record["doctorReview"] = review.model_dump()
    return record

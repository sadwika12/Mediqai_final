import time

from fastapi import APIRouter, HTTPException

from app.models.schemas import PredictRequest, RecordOut
from app.services.model import predict as run_prediction
from app.data.seed import find_user_by_id, add_record, _uid

router = APIRouter(prefix="/predict", tags=["predict"])


@router.post("", response_model=RecordOut)
def create_prediction(body: PredictRequest):
    user = find_user_by_id(body.userId)
    if not user:
        raise HTTPException(status_code=404, detail="Unknown user")
    try:
        result = run_prediction(body.diseaseId, body.selectedIds)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    record = {
        "id": _uid("rec"),
        "userId": user["id"],
        "userName": user["name"],
        "diseaseId": body.diseaseId,
        "inputMethod": body.inputMethod,
        "selectedIds": body.selectedIds,
        "result": result,
        "timestamp": int(time.time() * 1000),
        "doctorReview": None,
    }
    add_record(record)
    return record

from fastapi import APIRouter

from app.models.schemas import UserOut
from app.data.seed import USERS

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[UserOut])
def list_users():
    """Used by the admin 'Users' page."""
    return USERS

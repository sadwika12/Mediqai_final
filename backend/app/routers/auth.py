from fastapi import APIRouter, HTTPException

from app.models.schemas import LoginRequest, SignupRequest, UserOut
from app.data.seed import find_user_by_email, add_user, _uid

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=UserOut)
def login(body: LoginRequest):
    user = find_user_by_email(body.email)
    if not user or user["password"] != body.password:
        # NOTE: plaintext password comparison — dummy-data only. Hash
        # passwords (e.g. passlib/bcrypt) before this ever touches real users.
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return user


@router.post("/signup", response_model=UserOut)
def signup(body: SignupRequest):
    if find_user_by_email(body.email):
        raise HTTPException(status_code=409, detail="An account with that email already exists")
    user = {
        "id": _uid("user"),
        "name": body.name,
        "email": body.email,
        "password": body.password,
        "role": body.role,
        "specialty": body.specialty if body.role == "doctor" else None,
    }
    add_user(user)
    return user

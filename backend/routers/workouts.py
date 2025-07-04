from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class Workout(BaseModel):
    date: str
    sport: str
    type: str
    duration: int
    intensity: int
    notes: str = ""

@router.post("/log")
def log_workout(workout: Workout):
    # For now, just return what you got
    return {"status": "Workout logged!", "data": workout}

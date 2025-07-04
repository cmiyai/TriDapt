from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class FeedbackRequest(BaseModel):
    workouts: str

@router.post("/feedback")
def get_feedback(req: FeedbackRequest):
    # Placeholder response until we integrate OpenAI
    return {"feedback": "You did great this week! Keep your easy days easy."}

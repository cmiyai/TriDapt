from fastapi import APIRouter

router = APIRouter()

@router.get("/plan")
def get_plan():
    # Hardcoded example
    return {
        "week": [
            {"day": "Mon", "sport": "Swim", "type": "Easy", "duration": 30},
            {"day": "Tue", "sport": "Bike", "type": "Intervals", "duration": 45},
            {"day": "Wed", "sport": "Run", "type": "Tempo", "duration": 40},
        ]
    }

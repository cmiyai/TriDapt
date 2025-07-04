from sqlmodel import Field, SQLModel
from typing import Optional #allows a value to be None
from datetime import date

# Sets our DB validation model for Workouts
class Workout(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True) #increments ID
    date: date
    sport: str
    type: str
    duration: int
    intensity: int
    notes: Optional[str] = None #Note: Must be string if not used
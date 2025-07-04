from fastapi import FastAPI, Request
from datetime import datetime
# CORS (Cross-Origin Resource Sharing)
# allows requests to different domains: we allow our frontend
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Session, create_engine, select
from models import Workout

# Later: import your route files
# from routers import plans, log, feedback

app = FastAPI()

# CORS setup: allows frontend access from localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Example route — example plan
@app.get("/plan")
def get_plan():
    return {
        "week": [
            {"day": "Mon", "sport": "Swim", "type": "Easy", "duration": 30},
            {"day": "Tue", "sport": "Bike", "type": "Intervals", "duration": 45},
            {"day": "Wed", "sport": "Run", "type": "Tempo", "duration": 40},
        ]
    }

# Set up the database
sqlite_file_name = "workouts.db"
engine = create_engine(f"sqlite:///{sqlite_file_name}", echo=True)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)
    #creates out workout file when app opens

# Save a workout to DB
@app.post("/log")
# asynchronous function: lets us pause while waiting for a file reading or request
async def log_workout(request: Request):
    data = await request.json() # get JSON body
    # Convert string date to actual Python date object
    data["date"] = datetime.strptime(data["date"], "%Y-%m-%d").date()

    workout = Workout(**data) # convert dict to Workout model
    with Session(engine) as session:
        session.add(workout)
        session.commit()
    return {"status": "Workout logged!", "data": workout}

# Returns all saved workouts
@app.get("/logs")
def get_logs():
    '''allows to log workouts'''
    with Session(engine) as session:
        statement = select(Workout)
        results = session.exec(statement)
        workouts = results.all()
        return workouts
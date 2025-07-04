const BASE_URL = "http://localhost:8000";  // Your FastAPI server

// maps to training plan
export async function fetchPlan() {
  const res = await fetch(`${BASE_URL}/plan`);
  return res.json();
}

//NOTE: /log: posts workout, /logs: get workout history

//maps to workout history
export async function fetchLogs() {
  const res = await fetch(`${BASE_URL}/logs`);
  return res.json();
}

// logs the workout
export async function logWorkout(workout) {
  const res = await fetch(`${BASE_URL}/log`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workout),
  });
  return res.json();
}

// in dev
export async function getFeedback(workoutsText) {
  const res = await fetch(`${BASE_URL}/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ workouts: workoutsText }),
  });
  return res.json();
}

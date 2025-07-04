import { useState } from "react";
import { logWorkout } from "../utils/api";

// Handles the input for logging our workouts
export default function WorkoutLogger() {
  // Stores out form inputs as local state
  const [form, setForm] = useState({
    date: "",
    sport: "",
    type: "",
    duration: 0,
    intensity: 5,
    notes: "",
  });

  const [error, setError] = useState(""); // error state until valid

  // Handles what user inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Saves the workout they input
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent the page from reloading

    // Check if any field is empty except for notes
    const { date, sport, type, duration, intensity } = form;
    if (!date || !sport || !type || !duration || !intensity) {
      setError("Please fill out all required fields.");
      return;
    }

    // Check if duration is a positive number
    const parsedDuration = parseInt(form.duration);
    if (parsedDuration <= 0) {
      setError("Duration must be a positive number.");
      return;
    }

    // No errors and submit
    setError("");
    const result = await logWorkout(form);
    alert(result?.status || "Logged!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Log Workout</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input name="date" type="date" onChange={handleChange} />
      <input name="sport" placeholder="Run, Bike, Swim" onChange={handleChange} />
      <input name="type" placeholder="Tempo, Easy, etc." onChange={handleChange} />
      <input name="duration" placeholder="Duration" type="number" onChange={handleChange} />
      <input name="intensity" placeholder="Intensity" type="number" min="1" max="10" style={{ width: '60px' }} onChange={handleChange} />
      <textarea name="notes" placeholder="Notes..." onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

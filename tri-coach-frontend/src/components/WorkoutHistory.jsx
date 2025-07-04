import { useEffect, useState } from "react";
import { fetchLogs } from "../utils/api";

// Displays our workout history
export default function WorkoutHistory() {
    // Declares a piece of state to hold the workout history, initialized as an empty array
    const [history, setHistory] = useState([]);

    useEffect(() => {
      async function getLog() {
        const data = await fetchLogs(); // Calls the backend to get workout history
        setHistory (data); // Stores the results in the state variable 
      }
      getLog();

    }, []); // Empty array = run once on initial render

    // Renders our workout in jsx
    return (
      <div>
        <h3>Workout History</h3>
        <ul>
        {history.map((item, i) => (
          <li key={i}>
            {item.date}: {item.sport} – {item.type} ({item.duration} mins)(Intensity: {item.intensity}) (Notes: {item.notes})
          </li>
        ))}
      </ul>
        
      </div>
    )
}
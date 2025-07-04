import { useEffect, useState } from "react";
//useEffect lets us synchronize with effects from outside (API)
//useState lets us add a state variable to our component
import { fetchPlan } from "../utils/api"; // fetch our custom training plan

// Displays our weekly training plan
export default function PlanViewer() {
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    async function getPlan() {
      const data = await fetchPlan();
      setPlan(data.week);
    }
    getPlan();
  }, []);

  return (
    <div>
      <h3>Weekly Training Plan</h3>
      <ul>
        {plan.map((item, i) => (
          <li key={i}>
            {item.day}: {item.sport} – {item.type} ({item.duration} mins)
          </li>
        ))}
      </ul>
    </div>
  );
}

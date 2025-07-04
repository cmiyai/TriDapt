import PlanViewer from '../components/PlanViewer'
import WorkoutLogger from '../components/WorkoutLogger'
import WorkoutHistory from '../components/WorkoutHistory'

export default function Dashboard() {
  return (
    <div>
      <h2>Your Weekly Plan</h2>
      <PlanViewer />

      <h2>Log a Workout</h2>
      <WorkoutLogger />

      <h2>AI Coach Feedback</h2>
      <h3>in development</h3>

      <h2>Workout History</h2>
      <WorkoutHistory />

    </div>
  )
}

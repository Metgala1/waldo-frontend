import { Link } from "react-router-dom";
export default function ScorePage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Leaderboard</h1>
      <p>Scores will go here.</p>
      <Link to={'/'}>Go home</Link>
    </div>
  );
}

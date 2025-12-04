import { Link } from "react-router-dom";

export default function GamePage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Game Page</h1>
      <p>This is where the Waldo image will appear.</p>
      <Link to={'/scores'}>Check scores</Link>
    </div>
  );
}

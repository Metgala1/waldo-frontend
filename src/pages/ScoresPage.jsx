import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ScoresPage.module.css';

export default function ScoresPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const gameResult = location.state;

  const scores = [
    { rank: 1, name: 'Player123', time: '01:23', characters: 6 },
    { rank: 2, name: 'RickFan', time: '01:45', characters: 6 },
    { rank: 3, name: 'MortyMaster', time: '02:10', characters: 6 },
    { rank: 4, name: 'GamePro', time: '02:35', characters: 6 },
    { rank: 5, name: 'QuickEyes', time: '03:02', characters: 6 },
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>🏆</div>
        <h1 className={styles.title}>Leaderboard</h1>
        <button className={styles.homeBtn} onClick={() => navigate('/')}>
          ← Home
        </button>
      </nav>

      {/* Game Result */}
      {gameResult && (
        <div className={styles.resultSection}>
          <div className={styles.resultCard}>
            <h2>Your Score</h2>
            <div className={styles.resultContent}>
              <p className={styles.resultTime}>{formatTime(gameResult.time)}</p>
              <p className={styles.resultChars}>{gameResult.characters} Characters Found</p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <section className={styles.leaderboardSection}>
        <h2 className={styles.sectionTitle}>Top Scores</h2>
        
        <div className={styles.tableContainer}>
          <table className={styles.leaderboard}>
            <thead>
              <tr>
                <th className={styles.rankCol}>Rank</th>
                <th className={styles.nameCol}>Player</th>
                <th className={styles.timeCol}>Time</th>
                <th className={styles.charCol}>Found</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score) => (
                <tr key={score.rank} className={styles.scoreRow}>
                  <td className={`${styles.rank} ${score.rank === 1 ? styles.first : ''} ${score.rank === 2 ? styles.second : ''} ${score.rank === 3 ? styles.third : ''}`}>
                    {score.rank === 1 ? '🥇' : score.rank === 2 ? '🥈' : score.rank === 3 ? '🥉' : score.rank}
                  </td>
                  <td className={styles.name}>{score.name}</td>
                  <td className={styles.time}>{score.time}</td>
                  <td className={styles.chars}>{score.characters}/6</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <button className={styles.playAgainBtn} onClick={() => navigate('/')}>
          ▶ Play Again
        </button>
        <p>© 2025 Rick & Morty Hunt. All rights reserved.</p>
      </footer>
    </div>
  );
}

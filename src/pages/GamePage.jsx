import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import images from '../data/images';
import styles from './GamePage.module.css';

export default function GamePage() {
  const { imageId } = useParams();
  const navigate = useNavigate();
  const [gameData] = useState(() => images.find(img => img.id === parseInt(imageId)));
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // Timer effect
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Check win condition
  useEffect(() => {
    if (foundCharacters.length === gameData?.characters.length) {
      setIsRunning(false);
      setTimeout(() => {
        // Navigate to scores with time
        navigate('/scores', { state: { time, characters: foundCharacters.length } });
      }, 2000);
    }
  }, [foundCharacters, gameData, navigate, time]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleImageClick = (e) => {
    if (!isRunning) return;

    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const found = gameData.characters.find(
      char => 
        !foundCharacters.find(f => f.id === char.id) &&
        Math.abs(char.x - x) < 8 && 
        Math.abs(char.y - y) < 8
    );

    if (found) {
      setFoundCharacters([...foundCharacters, found]);
    }
  };

  if (!gameData) return <div className={styles.error}>Game not found</div>;

  const remaining = gameData.characters.length - foundCharacters.length;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => navigate('/')}>← Home</button>
          <div className={styles.timerGroup}>
            <span className={styles.timerLabel}>⏱️</span>
            <span className={styles.timerValue}>{formatTime(time)}</span>
          </div>
        </div>

        <h2 className={styles.gameTitle}>{gameData.title}</h2>

        <div className={styles.headerRight}>
          <div className={styles.foundSection}>
            <span className={styles.foundLabel}>Found: {foundCharacters.length}/{gameData.characters.length}</span>
            <div className={styles.characterList}>
              {gameData.characters.map(char => (
                <div 
                  key={char.id} 
                  className={`${styles.charItem} ${foundCharacters.find(f => f.id === char.id) ? styles.found : ''}`}
                >
                  {char.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Game Canvas */}
      <main className={styles.gameArea}>
        <div className={styles.gameContainer}>
          <img 
            src={gameData.url} 
            alt={gameData.title} 
            className={styles.gameImage}
            onClick={handleImageClick}
          />
          
          {/* Character markers */}
          {foundCharacters.map(char => (
            <div 
              key={char.id}
              className={styles.marker}
              style={{ left: `${char.x}%`, top: `${char.y}%` }}
            >
              <div className={styles.markerCircle}>✓</div>
              <span className={styles.markerLabel}>{char.name}</span>
            </div>
          ))}
        </div>

        {/* Character list sidebar */}
        <aside className={styles.sidebar}>
          <h3>Find These:</h3>
          <ul className={styles.charactersList}>
            {gameData.characters.map(char => (
              <li key={char.id} className={foundCharacters.find(f => f.id === char.id) ? styles.found : ''}>
                {foundCharacters.find(f => f.id === char.id) ? '✓' : '○'} {char.name}
              </li>
            ))}
          </ul>
        </aside>
      </main>

      {/* Status Modal */}
      {!isRunning && foundCharacters.length === gameData.characters.length && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>🎉 Congratulations!</h2>
            <p>You found all {gameData.characters.length} characters!</p>
            <p className={styles.finalTime}>Time: {formatTime(time)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

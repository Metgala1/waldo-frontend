import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GamePage.module.css';
import { GameContext } from '../Context/GameContext';

export default function GamePage() {
  const navigate = useNavigate();
  const { images } = useContext(GameContext);

  const gameData = images ? images : null;

  const [foundCharacters, setFoundCharacters] = useState([]);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const imageRef = useRef(null);

  // Timer
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Win condition
  useEffect(() => {
    if (foundCharacters.length === gameData?.Character.length) {
      setIsRunning(false);
      setTimeout(() => {
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
    if (!isRunning || !imageRef.current) return;

    const img = imageRef.current;
    const rect = img.getBoundingClientRect();

    const containerWidth = rect.width;
    const containerHeight = rect.height;
    const imgNaturalWidth = img.naturalWidth;
    const imgNaturalHeight = img.naturalHeight;

    const scaleX = containerWidth / imgNaturalWidth;
    const scaleY = containerHeight / imgNaturalHeight;
    const scale = Math.min(scaleX, scaleY);

    const scaledWidth = imgNaturalWidth * scale;
    const scaledHeight = imgNaturalHeight * scale;

    const offsetX = (containerWidth - scaledWidth) / 2;
    const offsetY = (containerHeight - scaledHeight) / 2;

    const clickX = e.clientX - rect.left - offsetX;
    const clickY = e.clientY - rect.top - offsetY;

    const x = (clickX / scaledWidth) * 100;
    const y = (clickY / scaledHeight) * 100;

    if (x < 0 || x > 100 || y < 0 || y > 100) return;

    const found = gameData.Character.find(
      char =>
        !foundCharacters.find(f => f.id === char.id) &&
        Math.abs(char.x - x) < 8 &&
        Math.abs(char.y - y) < 8
    );

    if (found) {
      setFoundCharacters(prev => [...prev, found]);
    }

    console.log(`Click: x ${x.toFixed(2)}, y ${y.toFixed(2)}`);
  };

  if (!gameData) return <div className={styles.error}>Game not found</div>;

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
            <span className={styles.foundLabel}>
              Found: {foundCharacters.length}/{gameData.Character.length}
            </span>

            <div className={styles.characterList}>
              {gameData.Character.map(char => (
                <div
                  key={char.id}
                  className={`${styles.charItem} ${
                    foundCharacters.find(f => f.id === char.id) ? styles.found : ''
                  }`}
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
            ref={imageRef}
            src={gameData.imageUrl}
            alt={gameData.title}
            className={styles.gameImage}
            onClick={handleImageClick}
          />

          {/* Character markers */}
          {foundCharacters.map(char => {
            if (!imageRef.current) return null;

            const img = imageRef.current;
            const rect = img.getBoundingClientRect();

            const containerWidth = rect.width;
            const containerHeight = rect.height;
            const imgNaturalWidth = img.naturalWidth;
            const imgNaturalHeight = img.naturalHeight;

            const scaleX = containerWidth / imgNaturalWidth;
            const scaleY = containerHeight / imgNaturalHeight;
            const scale = Math.min(scaleX, scaleY);

            const scaledWidth = imgNaturalWidth * scale;
            const scaledHeight = imgNaturalHeight * scale;

            const offsetX = (containerWidth - scaledWidth) / 2;
            const offsetY = (containerHeight - scaledHeight) / 2;

            const markerX = offsetX + (char.x / 100) * scaledWidth;
            const markerY = offsetY + (char.y / 100) * scaledHeight;

            return (
              <div
                key={char.id}
                className={styles.marker}
                style={{ left: `${markerX}px`, top: `${markerY}px` }}
              >
                <div className={styles.markerCircle}>✓</div>
                <span className={styles.markerLabel}>{char.name}</span>
              </div>
            );
          })}
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <h3>Find These:</h3>
          <ul className={styles.charactersList}>
            {gameData.Character.map(char => (
              <li
                key={char.id}
                className={foundCharacters.find(f => f.id === char.id) ? styles.found : ''}
              >
                {foundCharacters.find(f => f.id === char.id) ? '✓' : '○'} {char.name}
              </li>
            ))}
          </ul>
        </aside>
      </main>

      {/* Win Modal */}
      {!isRunning && foundCharacters.length === gameData.Character.length && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>🎉 Congratulations!</h2>
            <p>You found all {gameData.Character.length} characters!</p>
            <p className={styles.finalTime}>Time: {formatTime(time)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

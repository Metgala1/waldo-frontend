import { useState, useEffect, useRef } from 'react';
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
  const imageRef = useRef(null);

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
    if (!isRunning || !imageRef.current) return;

    const img = imageRef.current;
    const rect = img.getBoundingClientRect();
    
    // Calculate actual image position within container (for object-fit: contain)
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
    
    // Calculate click position relative to actual image
    const clickX = e.clientX - rect.left - offsetX;
    const clickY = e.clientY - rect.top - offsetY;
    
    // Convert to percentage of original image
    const x = (clickX / scaledWidth) * 100;
    const y = (clickY / scaledHeight) * 100;
    
    // Ensure coordinates are within image bounds
    if (x < 0 || x > 100 || y < 0 || y > 100) return;

    const found = gameData.characters.find(
      char => 
        !foundCharacters.find(f => f.id === char.id) &&
        Math.abs(char.x - x) < 8 && 
        Math.abs(char.y - y) < 8
    );
    
    if (found) {
      setFoundCharacters([...foundCharacters, found]);
    }
    
    console.log(`Click: x ${x.toFixed(2)}, y ${y.toFixed(2)}`);
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
            ref={imageRef}
            src={gameData.url} 
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

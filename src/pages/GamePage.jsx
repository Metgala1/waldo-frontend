import React, { useState, useEffect } from 'react';
import styles from "../styles/GamePage.module.css";

const GamePage = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  
  const itemsToFind = [
    { id: 1, name: 'Doraemon', x: 15, y: 28 },
    { id: 2, name: 'Nobita', x: 25, y: 44 },
    { id: 3, name: 'Shizuka', x: 50, y: 60 },
  ];

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  
  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    
    const found = itemsToFind.find(
      (item) => !foundItems.some((f) => f.id === item.id) &&
                Math.abs(item.x - x) < 5 && Math.abs(item.y - y) < 5
    );

    if (found) {
      setFoundItems((prev) => [...prev, { ...found, x: `${found.x}%`, y: `${found.y}%` }]);
    }
  };

  const remaining = itemsToFind.length - foundItems.length;

  return (
    <div className={styles.container}>
      {/* Header Bar */}
      <header className={styles.header}>
        <div className={styles.timerGroup}>
          <span>⌛</span>
          <span className={styles.label}>Time</span>
          <span className={styles.timeValue}>{formatTime(time)}</span>
        </div>

        <div className={styles.foundSection}>
          <span className={styles.label}>Found:</span>
          <div className={styles.avatarStack}>
            {foundItems.map((item) => (
              <img key={item.id} src={`avatar${item.id}.png`} className={styles.avatar} alt={item.name} />
            ))}
          </div>
        </div>

        <div className={styles.remainingBadge}>
          Remaining: {remaining}
        </div>
      </header>

      
      <div className={styles.itemsList}>
        <h3>Find:</h3>
        <ul>
          {itemsToFind.map((item) => (
            <li key={item.id} className={foundItems.some((f) => f.id === item.id) ? styles.found : ''}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      
      <main className={styles.gameCanvas}>
        <img 
          src="path-to-your-doraemon-image.jpg" 
          className={styles.gameImage} 
          alt="Game Scene" 
          onClick={handleImageClick}
        />

       
        {foundItems.map((item) => (
          <div 
            key={item.id}
            className={styles.checkMarker}
            style={{ left: item.x, top: item.y }}
          >
            ✔
          </div>
        ))}
      </main>

      <footer className={styles.footer}>
        © 2025 . All rights reserved.
      </footer>
    </div>
  );
};

export default GamePage;

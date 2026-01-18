import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import { useContext } from 'react';
import { GameContext } from '../Context/GameContext';

export default function HomePage() {
  const navigate = useNavigate();
  const {images , loading} = useContext(GameContext);

  const startGame = () => {
    navigate("/game");
  };

  return (
    <div className={styles.container}>
      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <h1 className={styles.title}>Rick & Morty Hunt</h1>
        <div className={styles.navLinks}>
          <button className={styles.navItem} onClick={() => navigate('/')}>Home</button>
          <button className={styles.navItem} onClick={() => navigate('/scores')}>Leaderboard</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <h2 className={styles.heroTitle}>Welcome to {images[0]?.title}</h2>
        <p className={styles.heroSubtitle}>
          Find all the hidden characters in the scene before time runs out!
        </p>
      </section>

      {/* GAMES GRID */}
      <section className={styles.gamesSection}>
        <h2 className={styles.sectionTitle}>Available Games</h2>
        <div className={styles.gamesGrid}>
          {images && (
  <div key={images.id} className={styles.gameCard}>
    <img 
      src={images.imageUrl} 
      alt={images.title} 
      className={styles.cardImage} 
    />

    <div className={styles.cardContent}>
      <h3>{images.title}</h3>
      <p>Find characters: <br />{
        images.Character?.map(char => (
          <span key={char.id}>{char.name} ,</span>
        ))}
      </p>
      <button 
        className={styles.playBtn}
        onClick={() => startGame()}
      >
        ▶ Play Game
      </button>
    </div>
  </div>
)}

        </div>
      </section>

      {/* HOW TO PLAY */}
      <section className={styles.howToPlay}>
        <h2 className={styles.sectionTitle}>How to Play</h2>
        <div className={styles.stepsGrid}>
         {/* 
         commented out because just one scene is available right now 
          <div className={styles.step}>
            <div className={styles.stepNum}>1</div>
            <h3>Select a Game</h3>
            <p>Choose a scene and click start to begin</p>
          </div>
          */}
          <div className={styles.step}>
            <div className={styles.stepNum}>1</div>
            <h3>Find Characters</h3>
            <p>Click on characters to tag them in the scene</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>2</div>
            <h3>Beat the Clock</h3>
            <p>Find all characters before time runs out</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>3</div>
            <h3>Submit Score</h3>
            <p>Get on the leaderboard with your best time</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>© 2025 Rick & Morty Hunt. All rights reserved.</p>
      </footer>
    </div>
  );
}

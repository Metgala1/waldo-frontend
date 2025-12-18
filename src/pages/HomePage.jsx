import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImages } from "../services/api";
import styles from "../styles/HomePage.module.css";

export default function HomePage() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await getImages();
        setImages(res.data.images);
      } catch (err) {
        console.error("Failed to fetch images:", err);
      }
    }
    fetchImages();
  }, []);

  const startGame = () => {
    if (images.length > 0) {
      navigate(`/game/${images[0].id}`);
    }
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>🔍</div>
        <div className={styles.navLinks}>
          <span className={styles.navItem}>Home</span>
          <span
            className={styles.navItem}
            onClick={() => navigate("/scores")}
          >
            Leaderboard
          </span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Picture Hunt</h1>
        <p className={styles.heroSubtitle}>
          Unleash your inner detective! Find hidden characters in vibrant scenes against the clock.
        </p>

        <div className={styles.heroButtons}>
          <button className={styles.primaryBtn} onClick={startGame}>
            ▶ Start Game
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={() => navigate("/scores")}
          >
            🏆 Leaderboard
          </button>
        </div>
      </section>

      {/* HOW TO PLAY */}
      <section className={styles.howToPlay}>
        <h2 className={styles.sectionTitle}>How To Play</h2>

        <div className={styles.cardGrid}>
          <div className={styles.infoCard}>
            <h3>🎯 Find Characters</h3>
            <p>
              Spot hidden characters within detailed scenes. Keep your eyes sharp!
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>🖱️ Tag Them Quick</h3>
            <p>
              Click on characters to tag them and beat the clock. Precision is key.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>🏆 Compete & Win</h3>
            <p>
              Submit your best times and climb the global leaderboard.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} Picture Hunt. All rights reserved.
      </footer>
    </div>
  );
}

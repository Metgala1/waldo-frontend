import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImages } from "../services/api";

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

  return (
    <div className="home-container" style={styles.container}>
      <h1 style={styles.title}>Where’s Waldo</h1>
      <p style={styles.subtitle}>Choose an image to begin</p>

      <div style={styles.grid}>
        {images.map((img) => (
          <div
            key={img.id}
            style={styles.card}
            onClick={() => navigate(`/game/${img.id}`)}
          >
            <img
              src={img.url}
              alt={img.name}
              style={styles.image}
            />
            <h3 style={styles.imageName}>{img.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },
  title: {
    fontSize: "48px",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "20px",
    marginBottom: "40px",
    opacity: 0.7,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  card: {
    padding: "20px",
    borderRadius: "15px",
    background: "#f5f5f5",
    cursor: "pointer",
    transition: "0.2s",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
  },
  imageName: {
    marginTop: "10px",
    fontSize: "18px",
  },
};


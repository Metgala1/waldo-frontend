import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL

  // 🔹 Fetch images from backend
  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
    

      const res = await axios.get(`${BASE_URL}/images`);

      // matches: res.json({ image, message })
      setImages(res.data.image);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Auto-fetch on app load
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <GameContext.Provider
      value={{
        images,
        loading,
        error,
        fetchImages
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

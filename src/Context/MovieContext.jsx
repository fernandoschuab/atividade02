import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { apiKey } from "../api/config";

const MovieContext = createContext();

export function MovieContextProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const localData = localStorage.getItem("movie-finder-favorites");
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("movie-finder-favorites", JSON.stringify(favorites));
    } catch (e) {
      console.warn("Bloqueio de localStorage ignorado.");
    }
  }, [favorites]);

  function toggleFavorite(movie) {
    if (!movie || !movie.id) return;
    setFavorites((prev) => {
      const isFav = prev.some((f) => f.id === movie.id);
      if (isFav) {
        return prev.filter((f) => f.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  }

  async function searchMovies(query) {
    if (!query) return;
    setLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
        query
      )}&language=pt-BR`;
      const response = await axios.get(url);
      setMovies(response.data.results || []);
    } catch (error) {
      console.log(error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <MovieContext.Provider value={{ movies, loading, searchMovies, favorites, toggleFavorite }}>
      {children}
    </MovieContext.Provider>
  );
}

export default MovieContext;

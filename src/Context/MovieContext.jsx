import { createContext, useState } from "react";
import axios from "axios";
import { apiKey } from "../api/config";

const MovieContext = createContext();

export function MovieContextProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <MovieContext.Provider value={{ movies, loading, searchMovies }}>
      {children}
    </MovieContext.Provider>
  );
}

export default MovieContext;

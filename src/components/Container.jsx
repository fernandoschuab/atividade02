import { useContext, useEffect } from "react";
import MovieContext from "../Context/MovieContext";
import Gallery from "./Gallery";
import Loader from "./Loader";
import "./Container.css";

export default function Container({ searchTerm }) {
  const { movies, loading, searchMovies } = useContext(MovieContext);

  useEffect(() => {
    if (searchTerm) {
      searchMovies(searchTerm);
    } else {
      searchMovies("Popular");
    }
  }, [searchTerm]);

  return (
    <div className="main-container">
      <h2 className="container-title">
        {searchTerm ? `Filmes de ${searchTerm}` : "Filmes Populares"}
      </h2>
      {loading ? <Loader /> : <Gallery data={movies} searchTerm={searchTerm} />}
    </div>
  );
}

import { useContext, useEffect } from "react";
import MovieContext from "../Context/MovieContext";
import Gallery from "./Gallery";
import Loader from "./Loader";
import { TbMovieOff } from "react-icons/tb";
import "./Container.css";

export default function Container({ searchTerm }) {
  const { movies, loading, searchMovies, favorites } = useContext(MovieContext);

  useEffect(() => {
    if (searchTerm === "Favoritos") return; // Intercepta e nao aciona a API externa.
    if (searchTerm) {
      searchMovies(searchTerm);
    } else {
      searchMovies("Popular");
    }
  }, [searchTerm]);

  const displayData = searchTerm === "Favoritos" ? favorites : movies;

  return (
    <div className="main-container">
      <h2 className="container-title">
        {searchTerm === "Favoritos" 
          ? "Meus Filmes Favoritos" 
          : searchTerm 
            ? `Filmes de ${searchTerm}` 
            : "Filmes Populares"}
      </h2>
      
      {searchTerm === "Favoritos" && favorites.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-secondary)" }}>
          <TbMovieOff size={60} style={{ opacity: 0.5, marginBottom: "15px" }} />
          <h3>Nenhum favorito salvo</h3>
          <p>Você pode favoritar filmes clicando neles e usando o botão de coração!</p>
        </div>
      ) : loading && searchTerm !== "Favoritos" ? (
        <Loader />
      ) : (
        <Gallery data={displayData} searchTerm={searchTerm} />
      )}
    </div>
  );
}

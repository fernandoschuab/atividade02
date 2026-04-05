import { useContext, useState } from "react";
import MovieContext from "../Context/MovieContext";
import { TMDB_IMAGE_BASE_URL } from "../api/config";
import { TbMovieOff } from "react-icons/tb";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./Modal.css";

export default function Modal({ isOpen, onClose, movie }) {
  const { favorites, toggleFavorite } = useContext(MovieContext);
  const [imageError, setImageError] = useState(false);
  if (!isOpen) return null;

  const hasImage = movie.poster_path && !imageError;
  const imageUrl = hasImage ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : null;
  const isFav = favorites.some((f) => f.id === movie.id);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          {hasImage ? (
            <img
              src={imageUrl}
              alt={movie.title}
              className="modal-image"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="modal-image-fallback">
              <TbMovieOff className="modal-fallback-icon" />
              <span className="modal-fallback-text">Sem imagem</span>
            </div>
          )}
          <div className="modal-info">
            <h2 className="modal-title">{movie.title}</h2>
            <div className="modal-meta">
              <span className="modal-rating">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>
              <span className="modal-date">
                Lançamento:{" "}
                {movie.release_date
                  ? new Date(movie.release_date).toLocaleDateString("pt-BR")
                  : "N/A"}
              </span>
            </div>
            <p className="modal-description">
              {movie.overview ? movie.overview : "Descrição não disponível."}
            </p>
            <button
              className={`modal-favorite-btn ${isFav ? "active" : ""}`}
              onClick={() => toggleFavorite(movie)}
            >
              {isFav ? <FaHeart color="var(--accent-color)" /> : <FaRegHeart />}
              <span>{isFav ? "Favoritado" : "Favoritar"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { TMDB_IMAGE_BASE_URL } from "../api/config";
import "./Modal.css";

export default function Modal({ isOpen, onClose, movie }) {
  if (!isOpen) return null;

  const imageUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750.png?text=Sem+Poster";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <img src={imageUrl} alt={movie.title} className="modal-image" />
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
          </div>
        </div>
      </div>
    </div>
  );
}

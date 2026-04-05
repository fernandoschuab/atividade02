import { useState } from "react";
import { TMDB_IMAGE_BASE_URL } from "../api/config";
import Modal from "./Modal";
import { TbMovieOff } from "react-icons/tb";
import "./Image.css";

export default function Image({
  title,
  poster_path,
  vote_average,
  overview,
  release_date,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasImage = poster_path && !imageError;
  const imageUrl = hasImage ? `${TMDB_IMAGE_BASE_URL}${poster_path}` : null;

  return (
    <>
      <div className="image-card" onClick={() => setIsModalOpen(true)}>
        {hasImage ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="image-poster" 
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="image-fallback">
            <TbMovieOff className="image-fallback-icon" />
            <span className="image-fallback-text">Sem imagem</span>
          </div>
        )}
        <div className="image-overlay">
          <h3 className="image-title">{title}</h3>
          {vote_average > 0 && (
            <span className="image-rating">⭐ {vote_average.toFixed(1)}</span>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movie={{ title, poster_path, vote_average, overview, release_date }}
      />
    </>
  );
}

import { TMDB_IMAGE_BASE_URL } from "../api/config";
import "./Image.css";

export default function Image({ title, poster_path, vote_average }) {
  const imageUrl = poster_path
    ? `${TMDB_IMAGE_BASE_URL}${poster_path}`
    : "https://via.placeholder.com/500x750.png?text=Sem+Poster";

  return (
    <div className="image-card">
      <img src={imageUrl} alt={title} className="image-poster" />
      <div className="image-overlay">
        <h3 className="image-title">{title}</h3>
        {vote_average > 0 && (
          <span className="image-rating">
            ⭐ {vote_average.toFixed(1)}
          </span>
        )}
      </div>
    </div>
  );
}

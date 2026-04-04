import { TbMovieOff } from "react-icons/tb";
import "./NoImage.css";

export default function NoImage() {
  return (
    <div className="no-image-container">
      <TbMovieOff className="no-image-icon" />
      <h2 className="no-image-title">Nenhum filme encontrado</h2>
      <p className="no-image-text">
        Não conseguimos encontrar resultados. Tente buscar com outras palavras.
      </p>
    </div>
  );
}

import "./Container.css";

export default function Container({ searchTerm }) {
  return (
    <div className="main-container">
      <h2 className="container-title">
        {searchTerm ? `Filmes de ${searchTerm}` : "Filmes Populares"}
      </h2>
      <div className="container-placeholder">
       Galeria
      </div>
    </div>
  );
}

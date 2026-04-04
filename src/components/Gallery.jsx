import Image from "./Image";
import NoImage from "./NoImage";
import "./Gallery.css";

export default function Gallery({ data, searchTerm }) {
  if (!data || data.length === 0) {
    return searchTerm ? <NoImage /> : null;
  }

  return (
    <div className="gallery-masonry">
      {data.map((movie) => (
        <Image
          key={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
          vote_average={movie.vote_average}
        />
      ))}
    </div>
  );
}

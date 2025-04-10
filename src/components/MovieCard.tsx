import { FormEvent } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import "../styles/MovieCard.css";
interface MovieProps {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

function MovieCard({ id, title, release_date, poster_path }: MovieProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(id);
  function onFavoriteClick(event: FormEvent) {
    event.preventDefault();
    if (favorite) removeFromFavorites(id);
    else addToFavorites({ id, title, release_date, poster_path });
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ❤︎
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{title}</h3>
        <p>{release_date.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;

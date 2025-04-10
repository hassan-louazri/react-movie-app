import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";
import "../styles/Favorites.css";

interface Movie {
  title: string;
  id: number;
  release_date: string;
  poster_path: string;
}
function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites) {
    return (
      <div className="favorites">
        <div className="movies-grid">
          {favorites.map((movie: Movie) => (
            <MovieCard
              id={movie.id}
              title={movie.title}
              release_date={movie.release_date}
              key={movie.id}
              poster_path={movie.poster_path}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No favorites found.</h2>
      <p>Start adding movies to your favorites and they'll appear here.</p>
    </div>
  );
}

export default Favorites;

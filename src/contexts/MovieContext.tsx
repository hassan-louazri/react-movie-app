import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  Children,
} from "react";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface MovieContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

interface MovieProviderProps {
  children: ReactNode;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovieContext = (): MovieContextType => {
    const context = useContext(MovieContext)
    if(!context) {
        throw new Error("useMovieContext must be used within a MovieProvider");
    }
    return context;
};

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");

    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie: Movie) =>
    setFavorites((prev) => [...prev, movie]);
  const removeFromFavorites = (movieId: number) =>
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  const isFavorite = (movieId: number) =>
    favorites.some((movie) => movie.id === movieId);

  return (
    <MovieContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </MovieContext.Provider>
  );
};

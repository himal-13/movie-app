import { createContext, ReactNode, useContext, useState } from "react";
import { Movie } from "../App";

interface RatedMovie  {
  movie:Movie,
  rate: number;
  review: string;
}

interface FavrioteContextType  {
  favorites: Movie[];
  history: Movie[];
  ratedMovies: RatedMovie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  addHistory: (movie: Movie) => void;
  removeFromHistory: (movieId: number) => void;
  addRating: (movie: RatedMovie) => void;
  removeRating: (movieId: number) => void;
}



export const favoriteContext = createContext<FavrioteContextType | undefined>(undefined)

interface FavoritesProviderProps {
    children: ReactNode;
  }

const FavoriteProvider:React.FC<FavoritesProviderProps>  = ({children}) => {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [history, setHistory] = useState<Movie[]>([]);
    const [ratedMovies, setRatedMovies] = useState<RatedMovie[]>([]);


    const addFavorite = (movie: Movie) => {
      setFavorites(prevFavorites => [...prevFavorites, movie]);
    };
  
    const removeFavorite = (movieId: number) => {
      setFavorites(prevFavorites => prevFavorites.filter(movie => movie.id !== movieId));
    };
  
    const isFavorite = (movieId: number):boolean => {
      return favorites.some(movie => movie.id === movieId);
    };

    const addHistory = (movie: Movie): void => {
      setHistory(prevHistory => {
        const existing = prevHistory.find(m => m.id === movie.id);
        if (existing) {
          return prevHistory;
        }
        return [...prevHistory, movie];
      });
    };

  
    const removeFromHistory = (movieId: number): void => {
      setHistory(prevHistory => prevHistory.filter(movie => movie.id !== movieId));
    };

    const addRating = (movie: RatedMovie): void => {
      setRatedMovies([...ratedMovies,movie])
   
    };

    const removeRating = (movieId: number): void => {
      setRatedMovies(prevRatedMovies => prevRatedMovies.filter(list => list.movie.id !== movieId));
    };

    return (
      <favoriteContext.Provider value={{ favorites, addFavorite, ratedMovies, removeFavorite, isFavorite,addHistory,removeFromHistory,history,addRating,removeRating }}>
        {children}
      </favoriteContext.Provider>
    );
  };



export default FavoriteProvider

export const useFavorites = (): FavrioteContextType => {
    const context = useContext(favoriteContext);
    if (!context) {
      throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
  };
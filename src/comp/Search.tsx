


import  { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Movie } from "../App";
import { Link } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Movie []>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const API_KEY = `${import.meta.env.VITE_APP_API_KEY}`; 
  const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

  useEffect(() => {
    if (query.length > 1) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(BASE_URL, {
            params: {
              api_key: API_KEY,
              query,
            },
          });
          setSuggestions(response.data.results);
          console.log(response.data.results)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    if (isFocused) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isFocused]);


  const handleInputChange = (e:any) => {
    setQuery(e.target.value);
    setIsFocused(true);
  };
  
  

  return (
    <div ref={searchRef} className=" flex-col "> 
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for movies..."
        className=" m-2 px-4 sm:px-10 py-2 border-2 border-gray-500 rounded-xl sm:rounded-2xl "
      />
      {isFocused && <ul className={`w-2/3 absolute sm:top-20 top-30 left-1/2 -translate-x-1/2 bg-slate-100 rounded-md border-2  max-h-screen overflow-y-scroll search-results`}>
        {suggestions.length>0? suggestions.map((movie) => (
          <Link to={`/movie/${movie.id}`} onClick={()=>{setIsFocused(false)}}><li className='p-2 m-2 flex justify-between border-2' key={movie.id}>
            <span>{movie.title}</span>
            {movie.poster_path?<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} width={40} height={60} alt="" />:<></>}
          </li></Link>
        )):(
          <li className="h-auto m-2 overflow-hidden p-5 flex justify-center items-center">
            <h3>no result found</h3>
          </li>
        )}
      </ul>}
    </div>
  );
};

export default Search;

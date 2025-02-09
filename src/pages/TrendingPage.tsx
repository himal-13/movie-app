import NavBar from "../comp/NavBar"
import '../App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFire } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { useEffect, useState } from "react"
import TrendingMovie from "../comp/TrendingMovie"
import { Movie } from "../App"




const API_KEY = `${import.meta.env.VITE_APP_API_KEY}`;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
});

const TrendingPage = () => {
    const[trendMovies,setTrendMovies] = useState<Movie[]>([])
    const[activeGenre,setActiveGenre] = useState("action")



      const getMoviesByGenre = async (genreId:number) => {
        const response = await tmdbApi.get(`/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
        setTrendMovies(response.data.results);
      };

      useEffect( () =>{
        getMoviesByGenre(28)


      },[]);
  return (
    <div className="container">
    <NavBar/>
    <main>
        <div className="mt-24 trending-main">
        <h1 className=" text-4xl md:text-6xl py-2 md:py-6 "><FontAwesomeIcon icon={faFire}/>  <span>Trending</span></h1>
    <ul className="flex gap-4 sm:gap-6">
            <li className={`py-4 cursor-pointer ${activeGenre=="action"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('action'); getMoviesByGenre(28)}}>Action</li>
            <li className={`py-4 cursor-pointer ${activeGenre=="drama"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('drama'); getMoviesByGenre(18)}}>Drama</li>
            <li className={`py-4 cursor-pointer ${activeGenre=="adventure"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('adventure'); getMoviesByGenre(12)}}>Adventure</li>
            <li className={`py-4 cursor-pointer ${activeGenre=="comedy"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('comedy'); getMoviesByGenre(35)}}>Comedy</li>
            <li className={`py-4 cursor-pointer ${activeGenre=="horror"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('horror'); getMoviesByGenre(27)}}>Horror</li>


        </ul>       
     <hr /><hr />
     <div className="sm:grid sm:grid-cols-2 gap-2 xl:grid-cols-3">
        {trendMovies.map((movie)=>(
        <TrendingMovie movie={movie} key={movie.id}/>

        ))}

</div>
        </div>
    </main>

    </div>

  )
}

export default TrendingPage
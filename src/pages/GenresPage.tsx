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

const GenresPage = () => {
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
          <section className="flex justify-between items-center">
             <h1 className=" text-5xl sm:text-6xl py-2 md:py-6 "><FontAwesomeIcon icon={faFire}/>  <span>Genres</span></h1>
             <select name="genre" id="genre" className="p-2 xl:hidden" onChange={(e)=>getMoviesByGenre(parseInt(e.target.value))} >
              <option value={28}>Action</option>
              <option value={18}>Drama</option>
              <option value={80}>Crime</option>
              <option value={26}>Animation</option>
              <option value={10749}>Romance</option>
              <option value={12}>Adventure</option>
              <option value={35}>Comedy</option>
              <option value={27}>Horror</option>
              <option value={99}>Documentary</option>
              <option value={14}>Fantasy</option>
              <option value={36}>History</option>
              <option value={9648}>Mystery</option>
              <option value={53}>Thriller</option>

             </select>

          </section>
          <div className="hidden xl:block">
          <ul className="flex gap-4 sm:gap-6">
                <li className={`py-4 cursor-pointer ${activeGenre=="action"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('action'); getMoviesByGenre(28)}}>Action</li>
                <li className={`py-4 cursor-pointer ${activeGenre=="drama"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('drama'); getMoviesByGenre(18)}}>Drama</li>
                <li className={`py-4 cursor-pointer ${activeGenre=="adventure"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('adventure'); getMoviesByGenre(12)}}>Adventure</li>
                <li className={`py-4 cursor-pointer ${activeGenre=="comedy"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('comedy'); getMoviesByGenre(35)}}>Comedy</li>
                <li className={`py-4 cursor-pointer ${activeGenre=="romance"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('romance'); getMoviesByGenre(10749)}}>Romance</li>
                <li className={`py-4 cursor-pointer ${activeGenre=="animation"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('animation'); getMoviesByGenre(16)}}>Animation</li>
                <li className={`py-4 cursor-pointer ${activeGenre=="crime"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('crime'); getMoviesByGenre(80)}}>Crime</li>
                <li className={`py-4 cursor-pointer ${activeGenre=="doc"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('doc'); getMoviesByGenre(99)}}>Documentary</li>
                <li className={`py-4 cursor-pointer ${activeGenre=="fan"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('fan'); getMoviesByGenre(14)}}>Fantasy</li>
                <li className={`py-4 cursor-pointer ${activeGenre=="history"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('history'); getMoviesByGenre(36)}}>History</li>
                <li className={`py-4 cursor-pointer ${activeGenre=="mystery"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('mystery'); getMoviesByGenre(9648)}}>Mystery</li>
                <li className={`py-4 cursor-pointer ${activeGenre=="thriller"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('thriller'); getMoviesByGenre(53)}}>Thriller</li>
                <li className={`py-4 cursor-pointer ${activeGenre=="horror"?'border-b-4 border-gray-700':''}`} onClick={()=>{setActiveGenre('horror'); getMoviesByGenre(27)}}>Horror</li>



            </ul> </div>
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

export default GenresPage

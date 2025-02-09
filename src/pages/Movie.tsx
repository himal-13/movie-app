import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import NavBar from "../comp/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faHeart, faStar} from "@fortawesome/free-solid-svg-icons";
import { useFavorites } from "../services/context";
import SliderMovies from "../comp/SliderMovies";

export interface Genre {
  id: number;
  name: string;
}


interface Movietype {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  title: string;
  popularity: number;
  vote_average: number;
  genre:Genre[]
}

const API_KEY = `${import.meta.env.VITE_APP_API_KEY}`;

const Movie = () => {
  const[movie,setMovie] = useState<Movietype | undefined>(undefined)
  const[relatedMovies,setRelatedMovies] = useState<Movietype[]>([])
  const[error,setError] = useState<String | undefined>(undefined)
  const[rate,setRate] = useState<number>(0)
  const[review,setReview] = useState<string>('')

  const{isFavorite, addFavorite,removeFavorite, addHistory,addRating,ratedMovies} = useFavorites();
  

    const params = useParams();

    const fetchRelatedMovies = async (genreId: number) => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US`);
        setRelatedMovies(response.data.results);
      } catch (e) {
        setError('Failed to fetch related movies.');
      }
    };

   

    useEffect(()=>{
      const getMovie = async()=>{
        try{
        
        const response = await  axios.get(`https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${API_KEY}&language=en-US`);

        setMovie(response.data);
        addHistory(response.data);
        if (response.data.genres.length > 0) {
          fetchRelatedMovies(response.data.genres[0].id);
        }

        }catch(e:any){
          setError(e.message)
        }



        }
        getMovie()
        setRate(0)



    },[params.movieId])

    if(error){
      return (<h1 className="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Something's wrong: {error}</h1>)
    }

  if (!movie) {
    return <h1 className="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading...</h1>;
  }

  const handleFavClick=()=>{
    if(isFavorite(movie.id)){
      removeFavorite(movie.id);

    }else{
      addFavorite(movie)

    }

  }
  const handleReviewSubmit=()=>{
    addRating({movie,rate,review})


  }
  return (
    <div className="container">
      <NavBar/>
      <main className="w-11/12 flex-col justify-start h-full">
      <main className="relative w-full bg-cover bg-center mt-20 mx-auto" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`, height:'70vh'}}>
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center px-5 ">
          <section className="text-white p-4 max-w-2xl text-start">
            <h1 className="text-4xl sm:text-7xl font-bold mb-4">{movie.title}</h1>
            <h3 className="text-xl sm:text-3xl font-bold text-blue-500"><span>{movie.release_date.substring(0,4)}</span> | <span>{movie.vote_average.toFixed(1)}</span></h3>
            <p className="sm:my-4 sm:text-xl text-sm h-36 sm:h-auto overflow-y-hidden sm:overflow-auto">{movie.overview}</p>
            <div className="  ">
              <section className="cursor-pointer text-4xl">

              <FontAwesomeIcon icon={faHeart} className={isFavorite(movie.id)?'text-red-600':'text-white'} onClick={()=>handleFavClick()}/> 
              </section>
           {!ratedMovies.some(movi=>movi.movie===movie)?  <section className="">
      <h4 className="text-white text-xl">Rate & Review</h4>
        <div className="">
            {[1,2,3,4,5].map((star,index)=>(
                <FontAwesomeIcon icon={faStar} key={star} onClick={()=>setRate(star)} className={`cursor-pointer ${index<rate?'text-yellow-500':'text-white'}`}/>
        ))}

                </div>
                {rate>0 &&(
                    <div className="">
                        <input type="text" className="p-2 border-2 border-white bg-transparent" placeholder="write review" value={review} onChange={(e)=>setReview(e.target.value)} />
                        <button type="button" onClick={handleReviewSubmit} className="px-4 py-2 bg-blue-500 text-white">Submit</button>
                    </div>
                )}

    </section>:<h4 className="text-white">Already rated</h4>}

            </div>

          </section>
        </div>
        
      </main>
      <SliderMovies movies={relatedMovies} text="Related" />
      </main>

    </div>  )
}

export default Movie
import { Link } from "react-router-dom";
import { Movie } from "../App";


  type MovieProps ={
    movie:Movie
  }
  

const TrendingMovie = ({movie}:MovieProps) => {
  return (
    <Link to={`/movie/${movie.id}`} className=""> <div className="flex gap-4 my-4 hover:shadow-xl border-2">
       <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className=" w-1/4 xl:w-1/3 cursor-pointer" alt=""  />
        <div className="">
            <h2 className="text-2xl sm:my-4">{movie.title}</h2>
            <h4  className="text-gray-700 font-bold"><span>{movie.release_date.substring(0,4)}</span>  | <span>{movie.vote_average.toFixed(1)}</span></h4>

        </div>

    </div>
    </Link>
  )
}

export default TrendingMovie
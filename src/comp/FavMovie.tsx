import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Movie } from "../App"
import { faXmark } from "@fortawesome/free-solid-svg-icons"


interface Movietype{
    movie:Movie,
    deleteFav:(movie:Movie)=>void
}

const FavMovie = ({movie,deleteFav}:Movietype) => {
  return (
    <div className="flex h-20 my-4 sm:h-1/6  gap-4 w-full overflow-hidden bg-slate-100 rounded-xl justify-between">
      <div className="flex gap-4 max-w-3/4 overflow-hidden">
    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="cursor-pointer sm:h-32 md:h-full" alt=""/>
    <div className="">
    <h3 className="text-nowrap text-xl sm:text-4xl self-center">{movie.title}</h3>
    <h4><span>{movie.release_date.substring(0,4)}</span> | <span>{movie.vote_average.toFixed(1)}</span></h4>
    </div></div>
    <FontAwesomeIcon icon={faXmark} className="text-2xl self-center m-2 cursor-pointer" onClick={()=>deleteFav(movie)}/>
   </div>
  )
}

export default FavMovie

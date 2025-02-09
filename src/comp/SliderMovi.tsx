import {  faHeart} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Movie } from '../App'
import { useFavorites } from '../services/context'

interface MovieType {
    movie:Movie

}

const SliderMovi = ({movie}:MovieType) => {

  const {addFavorite,isFavorite,removeFavorite}= useFavorites();



  const toggleFavorite =()=>{
    const favorite = isFavorite(movie.id)
    if(favorite){
      removeFavorite(movie.id)

    }else{
      addFavorite(movie)
    }

 };
  return (
    <div
    className="max-w-1/5 overflow-hidden p-movie "

    key={movie.id}
  >
    <Link to={`/movie/${movie.id}`}>
    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="h-1/2 sm:h-3/4 hover:opacity-70" width="100%" alt="" />
    </Link>
    <h4 className=" xl:text-xl text-nowrap ">{movie.title}</h4>
    <div className="flex justify-between  text-violet-700 font-bold sm:px-4 ">
        <h3 className="flex gap-1"><span className="">{movie.release_date.substring(0, 4)}</span>
    <span className="hidden md:block"> | </span>
    <span className="hidden md:block">{movie.vote_average.toFixed(1)}</span>
    </h3>
    <div className="flex gap-2">
      <span className='hidden xl:block'>{isFavorite(movie.id)?'Remove':'Add to'}</span>
    <FontAwesomeIcon icon= {faHeart} className={`sm:text-2xl text-xl cursor-pointer ${isFavorite(movie.id)?'text-red-600':'text-black'}`} onClick={toggleFavorite}/>
    {/* <FontAwesomeIcon icon={faMinus} className="sm:text-2xl text-black cursor-pointer hidden sm:block"/> */}
    </div>
        </div>
  </div>
  )
}

export default SliderMovi
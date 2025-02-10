import { Link } from 'react-router-dom'
import { Movie } from '../App'



const SliderMovi = ({movie}:{movie:Movie}) => {

  return (
  <Link to={`/movie/${movie.id}`}>
  <div className="flex relative flex-col hover:shadow-2xl hover:scale-95 transition-all py-1">
    <section  className='flex-1' >
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}  alt="" />
    </section>
    <section className='flex justify-between items-center'>
      <h4 className='text-xs xl:text-sm'>{movie.title}</h4>
    </section>
    <section className='absolute flex justify-between sm:p-1 w-full text-xs text-white font-bold '>
      <span className='p-1 bg-purple-800/60 rounded-md sm:scale-100 scale-75'>{movie.release_date.substring(0, 4)}</span>
      <span className='p-1 bg-purple-800/60 rounded-md sm:scale-100 scale-75'>{movie.vote_average.toFixed(1)}</span>
    </section>

  </div>
  </Link>
  )
}

export default SliderMovi

import { Link } from 'react-router-dom'
import { Movie } from '../App'

interface MovieType {
    movie:Movie

}

const SliderMovi = ({movie}:MovieType) => {

  return (
  <Link to={`/movie/${movie.id}`}>
  <div className="flex relative flex-col hover:shadow-2xl hover:scale-95 transition-all py-1">
    <section  className='flex-1' >
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}  alt="" />
    </section>
    <section className='flex justify-between items-center'>
      <h4>{movie.title}</h4>
    </section>
    <section className='absolute flex justify-between p-1 w-full text-xs text-white'>
      <span className='p-1 bg-purple-800/60 rounded-md '>{movie.release_date.substring(0, 4)}</span>
      <span className='p-1 bg-purple-800/60 rounded-md '>{movie.vote_average.toFixed(1)}</span>
    </section>

  </div>
  </Link>
  )
}

export default SliderMovi

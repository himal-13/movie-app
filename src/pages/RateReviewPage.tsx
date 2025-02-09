import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import NavBar from "../comp/NavBar"
import { useFavorites } from "../services/context"
import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons"

const RateReviewPage = () => {
    const{ratedMovies,removeRating} = useFavorites()
  return (
    <div className="container">
    <NavBar/>
    <main>
        <div className="mt-24">
        <h1 className=" text-4xl md:text-6xl py-2 md:py-6 border-b-2 border-gray-300"><FontAwesomeIcon icon={faStar}/>  <span>Rated Movies</span></h1>
        <div className="w-full">
            {ratedMovies.length>0 ?(
                <section className="w-full h-screen">
                {ratedMovies.map((list)=>(
                        <div className="flex h-20 my-4 sm:h-1/6  gap-4 w-full overflow-hidden bg-slate-100 rounded-xl justify-between">
                        <div className="flex gap-4 max-w-3/4 overflow-hidden">
                        <img src={`https://image.tmdb.org/t/p/w500${list.movie.poster_path}`} className="cursor-pointer sm:h-32 md:h-full" alt=""/>
                        <div className="">
                        <h4>{[...Array(list.rate)].map(()=>(<FontAwesomeIcon icon={faStar} className="text-yellow-600"/>))}</h4>

                        <h3 className="text-nowrap text-xl sm:text-4xl self-center">{list.movie.title}</h3>
                        {/* <h4><span>{list.movie.release_date.substring(0,4)}</span> | <span>{list.movie.vote_average.toFixed(1)}</span></h4> */}
                        <h4 className="overflow-ellipsis">{list.review}...</h4>
                        </div></div>
                        <FontAwesomeIcon icon={faXmark} className="text-2xl self-center m-2 cursor-pointer" onClick={()=>removeRating(list.movie.id)}/>
                        </div>
                    ))}
                    </section>
                ): <h3 className="my-4 mx-2 text-center">You havent't rated any movie  yet.</h3>}
                </div>

        </div>

    </main>
    </div>
  )
}

export default RateReviewPage




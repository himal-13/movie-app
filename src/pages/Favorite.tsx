import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import NavBar from "../comp/NavBar"
import {  faCommentDots, faHeart } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useFavorites } from "../services/context";
import FavMovie from "../comp/FavMovie";
import { Movie } from "../App";



const Favorite = () => {
    const[favMovies,setFavMovies] = useState<Movie[]>([])
    const{favorites,removeFavorite} = useFavorites();

      useEffect( () =>{
        setFavMovies(favorites);


      },[favorites]);


      
  return (
    <div className="container">
    <NavBar/>
    <main>

        <div className="md:overflow-hidden mt-28 favorite-main h-full w-full" >
            <h1 className=" text-4xl sm:text-5xl my-3"><span>Favorites</span>  <FontAwesomeIcon icon={faHeart}/></h1>
            <hr /><hr />
            {favMovies.length >0? (<div className="m-2 w-full ">
           <section className="hidden w-1/2 md:block md:w-2/5 rounded-3xl bg-slate-500 favorite-preview ">
            {favMovies.length>0 && (
              <div className="flex justify-center items-center gap-4 p-4 w-full">
                <div className="">
                  <img src={`https://image.tmdb.org/t/p/w500${favMovies[0].poster_path}`} className="cursor-pointer rounded-xl h-[70vh] self-center" alt=""/>
                  <h4 className="text-white text-3xl">{favMovies.length} favorites movies</h4>
                  </div>
              </div>
            )}
            
            </section>
            <section className=" mx-auto w-11/12 md:overflow-y-auto md:absolute md:top-20 md:left-1/2 h-5/6 favorite-movies-section md:w-1/2 scroll">
             { favMovies.map((movie)=>(
                  <FavMovie deleteFav={()=>removeFavorite(movie.id)} movie={movie} key={movie.id}/>

                ))}

            </section>

            </div>):(<div className=" absolute top-1/2 left-1/2 -translate-x-1/2">
              <FontAwesomeIcon icon={faCommentDots} className="text-9xl text-gray-500"/>
              <h3 className="">Favorite is empty</h3></div>)}
        </div>

    </main>
    </div>

  )
}

export default Favorite
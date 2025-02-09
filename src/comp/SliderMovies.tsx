import { faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Movie } from "../App";
import SliderMovi from "./SliderMovi";


type SliderMoviesProps = {
  movies: Movie[];
  text:string
};

const SliderMovies = ({ movies,text }: SliderMoviesProps) => {
  const [currentMoviesSliderIndex, setCurrentMoviesIndex] = useState(0);
  
  

  const handleMoviesSliderBack = () => {
    if (currentMoviesSliderIndex > 0) {
      setCurrentMoviesIndex(currentMoviesSliderIndex - 1);
    }
  };

  const handleMoviesSliderForward = () => {
    if (currentMoviesSliderIndex < movies.length / 5 - 1) {
      setCurrentMoviesIndex(currentMoviesSliderIndex + 1);
    }
  };



  return (
    <div className=" w-full mt-5  overflow-hidden popular-movies-div">
      <div className="w-full flex justify-between my-4">
        <h1 className="text-2xl sm:text-4xl ">{text}</h1>
        <div>
          <FontAwesomeIcon
            icon={faAngleLeft}
            className={`bg-slate-200 text-3xl mx-2 p-2 ${currentMoviesSliderIndex===0?'cursor-not-allowed opacity-55': 'cursor-pointer'} `}
            onClick={handleMoviesSliderBack}
          />
          <FontAwesomeIcon
            icon={faAngleRight}
            className={`bg-slate-200 p-2 text-3xl ${currentMoviesSliderIndex===movies.length / 5 - 1?'cursor-not-allowed opacity-55': 'cursor-pointer'} `}
            onClick={handleMoviesSliderForward}
          />
        </div>
      </div>
      <div
        className="relative flex gap-2 popular-movies"
        style={{
          transform: `translateX(-${currentMoviesSliderIndex * 20}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {movies.map((movie) => (
        <SliderMovi movie={movie} key={movie.id}/>
        ))}
      </div>
    </div>
  );
};

export default SliderMovies;

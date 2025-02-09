import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="  border-gray-300 py-4 my-[5vh] absolute left-1/2 -translate-x-1/2">
        <hr />
        <div className="flex-col items-center">
        <h3 className="text-3xl text-center font-bold my-4">Movie<span className="text-red-500 text-center">Hub</span></h3>
        <div className="flex justify-around gap-10 my-4">
        <ul className="">
            <Link to="/"><li>Home</li></Link>
            <Link to="/favoritesmovies"><li>Favorites</li></Link>
            <Link to="/ratedmovies"><li>Rate and Review</li></Link>
            <Link to="/trending"><li>Trending</li></Link>
            <Link to="/history"><li>History</li></Link>


        </ul>
        <ul>
            <li>About</li>
            <li>Career</li>
            <li>Feddback</li>
            <li>Contact us</li>
            <li></li>
        </ul>
        </div>
        <ul className="flex gap-4 justify-center text-xl">
            <li><Link to={'https://github.com/himal-13/movies-app'} target="_blank"><FontAwesomeIcon icon={faGithub} className=""/></Link></li>
            <li>@MoviesHub2024</li>
        </ul>
        </div>
    </footer>
  )
}

export default Footer
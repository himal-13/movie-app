import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
            <div className="mt-20 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                <h1 className="text-4xl mb-4">OOPS! 404 Something went wrong</h1>
                <Link to='/' className="text-center text-xl border-2 text-blue-600 rounded-3xl p-2 hover:bg-blue-100 relative left-1/2 -translate-x-1/2">Return Home</Link>
            </div>

  )
}

export default ErrorPage
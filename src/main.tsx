import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TrendingPage from './pages/TrendingPage.tsx';
import Favorite from './pages/Favorite.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import HistoryPage from './pages/HistoryPage.tsx';
import Movie from './pages/Movie.tsx';
import FavoriteProvider from './services/context.tsx';
import RateReviewPage from './pages/RateReviewPage.tsx';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement:<ErrorPage/>
  },
  {
    path:'/trending',
    element:<TrendingPage/>,
    errorElement:<ErrorPage/>
    
  },
  {
    path:'/favoritesmovies',
    element:<Favorite />,
    errorElement:<ErrorPage/>

  },
  {
    path:'/history',
    element:<HistoryPage/>,
    errorElement:<ErrorPage/>
  },
  {
    path:'/movie/:movieId',
    element:<Movie/>,
    errorElement:<ErrorPage/>
  },
  {
    path:'/ratedmovies',
    errorElement:<ErrorPage/>,
    element:<RateReviewPage/>
  }



])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FavoriteProvider>
    <RouterProvider router={router}/>
    </FavoriteProvider>
  </React.StrictMode>,
)

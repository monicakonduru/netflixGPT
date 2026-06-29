import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Loader from './Loader'
import MainContainer from './MainContainer'
import MovieList from './MovieList'
import { TMDB_API_OPTIONS } from '../utils/constants'
import {
  setNowPlayingMovies,
  setPopularMovies,
  setTopRatedMovies,
  setUpcomingMovies,
} from '../utils/moviesSlice'

// TMDB list endpoints paired with the action that stores each result set.
const MOVIE_CATEGORIES = [
  { endpoint: 'now_playing', action: setNowPlayingMovies },
  { endpoint: 'popular', action: setPopularMovies },
  { endpoint: 'top_rated', action: setTopRatedMovies },
  { endpoint: 'upcoming', action: setUpcomingMovies },
]

function Browser() {
  const user = useSelector((store) => store.user)
  const authChecked = useSelector((store) => store.app.authChecked)
  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies)
  const popularMovies = useSelector((store) => store.movies.popularMovies)
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies)
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Protected route: once auth is resolved, kick out anyone not signed in.
  useEffect(() => {
    if (authChecked && !user) navigate('/')
  }, [authChecked, user, navigate])

  // Fetch every TMDB movie category once a signed-in user is present.
  useEffect(() => {
    if (!user) return

    const getMovies = async ({ endpoint, action }) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1`,
          TMDB_API_OPTIONS
        )
        const json = await response.json()
        dispatch(action(json.results))
      } catch (error) {
        console.error(`Failed to fetch ${endpoint} movies:`, error)
      }
    }

    MOVIE_CATEGORIES.forEach(getMovies)
  }, [user, dispatch])

  // Wait for Firebase before deciding — avoids bouncing a logged-in user.
  if (!authChecked) return <Loader />

  return (
    <div className="relative min-h-screen bg-black">
      <Header />
      <MainContainer movie={nowPlayingMovies?.[0]} />
      <div className="relative z-10 -mt-20 space-y-8 pb-12">
        <MovieList title="Popular" movies={popularMovies} />
        <MovieList title="Top Rated" movies={topRatedMovies} />
        <MovieList title="Upcoming" movies={upcomingMovies} />
      </div>
    </div>
  )
}

export default Browser
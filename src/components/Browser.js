import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Loader from './Loader'
import MainContainer from './MainContainer'
import MovieList from './MovieList'
import { TMDB_API_OPTIONS } from '../utils/constants'
import { setNowPlayingMovies } from '../utils/moviesSlice'

function Browser() {
  const user = useSelector((store) => store.user)
  const authChecked = useSelector((store) => store.app.authChecked)
  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Protected route: once auth is resolved, kick out anyone not signed in.
  useEffect(() => {
    if (authChecked && !user) navigate('/')
  }, [authChecked, user, navigate])

  // Fetch the "now playing" movies from TMDB once a signed-in user is present.
  useEffect(() => {
    if (!user) return

    const getNowPlayingMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
          TMDB_API_OPTIONS
        )
        const json = await response.json()
        dispatch(setNowPlayingMovies(json.results))
      } catch (error) {
        console.error('Failed to fetch now playing movies:', error)
      }
    }

    getNowPlayingMovies()
  }, [user, dispatch])

  // Wait for Firebase before deciding — avoids bouncing a logged-in user.
  if (!authChecked) return <Loader />

  return (
    <div className="relative min-h-screen bg-black">
      <Header />
      <MainContainer movie={nowPlayingMovies?.[0]} />
      <div className="relative z-10 -mt-20 space-y-8 pb-12">
        <MovieList title="Now Playing" movies={nowPlayingMovies} />
      </div>
    </div>
  )
}

export default Browser
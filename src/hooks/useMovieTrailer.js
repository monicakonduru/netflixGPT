import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { TMDB_API_OPTIONS } from '../utils/constants'
import { addTrailerVideo } from '../utils/moviesSlice'

// Fetches the YouTube trailer for a given movie and stores it in Redux so the
// hero banner can play it as a video background.
const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!movieId) return

    let active = true

    const getMovieVideos = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          TMDB_API_OPTIONS
        )
        const json = await response.json()
        const videos = json.results ?? []

        // Prefer an official "Trailer" on YouTube; fall back to any video.
        const trailer =
          videos.find((v) => v.type === 'Trailer' && v.site === 'YouTube') ??
          videos.find((v) => v.site === 'YouTube') ??
          videos[0]

        if (active) dispatch(addTrailerVideo(trailer ?? null))
      } catch (error) {
        console.error('Failed to fetch movie trailer:', error)
      }
    }

    getMovieVideos()
    return () => {
      active = false
    }
  }, [movieId, dispatch])
}

export default useMovieTrailer

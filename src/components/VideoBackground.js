import React from 'react'
import { useSelector } from 'react-redux'
import useMovieTrailer from '../hooks/useMovieTrailer'
import { TMDB_IMG_CDN_URL } from '../utils/constants'

// Autoplaying, muted YouTube trailer used as the hero banner background.
// Falls back to the movie backdrop image until the trailer is ready.
const VideoBackground = ({ movieId, fallbackImage, alt }) => {
  const trailerVideo = useSelector((store) => store.movies.trailerVideo)
  useMovieTrailer(movieId)

  if (!trailerVideo?.key) {
    return (
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={TMDB_IMG_CDN_URL + fallbackImage}
        alt={alt}
      />
    )
  }

  return (
    <iframe
      className="pointer-events-none absolute inset-0 h-full w-full scale-150 object-cover"
      src={
        'https://www.youtube.com/embed/' +
        trailerVideo.key +
        '?autoplay=1&mute=1&controls=0&loop=1&playlist=' +
        trailerVideo.key +
        '&modestbranding=1&showinfo=0&rel=0'
      }
      title="Trailer"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
  )
}

export default VideoBackground

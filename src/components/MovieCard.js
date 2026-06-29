import React from 'react'
import { TMDB_IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({ posterPath, title }) => {
  // Some entries have no poster — skip them rather than render a broken image.
  if (!posterPath) return null

  return (
    <div className="w-36 shrink-0 md:w-44">
      <img
        className="h-full w-full rounded-md object-cover transition duration-200 hover:scale-105"
        src={TMDB_IMG_CDN_URL + posterPath}
        alt={title}
      />
    </div>
  )
}

export default MovieCard

import React from 'react'
import { TMDB_IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({ movie, index = 0 }) => {
  if (!movie) return null

  // Prefer the wide backdrop (matches Netflix's landscape cards); fall back to
  // the portrait poster so a card without a backdrop still renders.
  const image = movie.backdrop_path || movie.poster_path
  if (!image) return null

  // Mimic Netflix's row badges: a TOP 10 ribbon on the leading titles and a
  // "Recently added" tag on the rest.
  const isTopTen = index < 4
  const label = movie.label || 'Recently added'

  return (
    <div className="group relative aspect-video w-64 shrink-0 cursor-pointer overflow-hidden rounded-md md:w-72">
      <img
        className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
        src={TMDB_IMG_CDN_URL + image}
        alt={movie.title}
      />

      {/* TOP 10 ribbon, top-right. */}
      {isTopTen && (
        <div className="absolute right-2 top-0 flex flex-col items-center rounded-b-sm bg-red-600 px-1.5 pb-1 pt-0.5 leading-none text-white shadow">
          <span className="text-[8px] font-bold tracking-wide">TOP</span>
          <span className="text-base font-extrabold">10</span>
        </div>
      )}

 
    </div>
  )
}

export default MovieCard

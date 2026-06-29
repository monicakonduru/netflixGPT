import React from 'react'
import { TMDB_IMG_CDN_URL } from '../utils/constants'

// Hero banner at the top of the browse page, built from the first movie.
const MainContainer = ({ movie }) => {
  if (!movie) return null

  const { title, overview, backdrop_path } = movie

  return (
    <div className="relative h-[56vh] w-full md:h-[80vh]">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={TMDB_IMG_CDN_URL + (backdrop_path || movie.poster_path)}
        alt={title}
      />
      {/* Fade into the page background at the bottom + dim for text legibility. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

      <div className="absolute bottom-[20%] z-10 max-w-xl px-6 text-white md:px-12">
        <h1 className="text-2xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-3 hidden text-sm text-gray-200 md:line-clamp-3 md:block md:text-base">
          {overview}
        </p>

        <div className="mt-5 flex gap-3">
          <button className="rounded bg-white px-6 py-2 font-semibold text-black transition hover:bg-white/80">
            ▶ Play
          </button>
          <button className="rounded bg-gray-500/60 px-6 py-2 font-semibold text-white transition hover:bg-gray-500/40">
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainContainer

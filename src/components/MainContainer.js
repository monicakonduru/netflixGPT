import React, { useEffect, useState } from 'react'
import VideoBackground from './VideoBackground'

// Hero banner at the top of the browse page, built from the first movie.
const MainContainer = ({ movie }) => {
  // Start expanded (title + description), then collapse to just the title,
  // mirroring the Netflix hero behaviour.
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    if (!movie) return
    // Reset to expanded whenever the featured movie changes, then collapse.
    setExpanded(true)
    const timer = setTimeout(() => setExpanded(false), 5000)
    return () => clearTimeout(timer)
  }, [movie])

  if (!movie) return null

  const { id, title, overview, backdrop_path } = movie

  return (
    <div className="relative h-[56vh] w-full overflow-hidden md:h-[80vh]">
      <VideoBackground
        movieId={id}
        fallbackImage={backdrop_path || movie.poster_path}
        alt={title}
      />
      {/* Fade into the page background at the bottom + dim for text legibility. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

      <div className="absolute bottom-[20%] z-10 max-w-xl px-6 text-white md:px-12">
        <h1
          className={`font-bold transition-all duration-700 ease-out ${
            expanded ? 'text-3xl md:text-6xl' : 'text-2xl md:text-4xl'
          }`}
        >
          {title}
        </h1>

        {/* Description stays visible but shrinks after a few seconds,
            mirroring the Netflix hero behaviour. */}
        <div className="mt-3 grid">
          <p
            className={`overflow-hidden text-gray-200 transition-all duration-700 ease-out ${
              expanded
                ? 'text-sm md:line-clamp-3 md:text-base'
                : 'text-xs md:line-clamp-2 md:text-sm'
            }`}
          >
            {overview}
          </p>
        </div>

        <div className="mt-5 flex gap-3">
          <button className="flex items-center gap-2 rounded bg-white px-5 py-2.5 text-lg font-semibold text-black transition hover:bg-white/80 md:px-7 md:py-3 md:text-xl">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 md:h-7 md:w-7">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>
          <button className="flex items-center gap-2 rounded bg-gray-500/60 px-5 py-2.5 text-lg font-semibold text-white transition hover:bg-gray-500/40 md:px-7 md:py-3 md:text-xl">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 md:h-7 md:w-7">
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="11" x2="12" y2="16" />
              <circle cx="12" cy="8" r="0.6" fill="currentColor" stroke="none" />
            </svg>
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainContainer

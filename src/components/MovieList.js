import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
  if (!movies?.length) return null

  return (
    <div className="px-6 md:px-12">
      <h2 className="mb-3 text-lg font-semibold text-white md:text-2xl">{title}</h2>
      <div className="flex gap-3 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
            title={movie.title}
          />
        ))}
      </div>
    </div>
  )
}

export default MovieList

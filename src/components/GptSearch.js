import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOGIN_BG, TMDB_API_OPTIONS } from '../utils/constants'
import openai from '../utils/openai'
import { addGptMovieResult } from '../utils/gptSlice'
import MovieList from './MovieList'

// Ask TMDB for a single title and return its result list (best match first).
const searchMovieByTitle = async (title) => {
  const response = await fetch(
    'https://api.themoviedb.org/3/search/movie?query=' +
      encodeURIComponent(title) +
      '&include_adult=false&language=en-US&page=1',
    TMDB_API_OPTIONS
  )
  const json = await response.json()
  return json.results ?? []
}

// GPT search view shown on /browse when the header's "GPT Search" toggle is on.
// Submitting a query asks GPT for movie titles, looks each up on TMDB, and
// renders the matches below the search bar.
function GptSearch() {
  const dispatch = useDispatch()
  const movieNames = useSelector((store) => store.gpt.movieNames)
  const movieResults = useSelector((store) => store.gpt.movieResults)

  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (event) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed || loading) return

    setLoading(true)
    setError('')

    try {
      // 1) Ask GPT for a comma-separated list of movie titles.
      //    Prompt = "act as a movie recommendation system" + the user's text.
      const gptPrompt =
        'Act as a movie recommendation system and suggest some movies for the query: ' +
        trimmed +
        '. Only give me names of 5 movies, comma separated, like the example result given ahead. ' +
        'Example result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya'

      const gptResults = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: gptPrompt }],
      })

      const titles = (gptResults.choices?.[0]?.message?.content ?? '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)

      if (!titles.length) {
        setError('No suggestions came back. Try rephrasing your search.')
        return
      }

      // 2) Look each title up on TMDB in parallel.
      const tmdbResults = await Promise.all(titles.map(searchMovieByTitle))

      // 3) Store names + results so the list below can render them.
      dispatch(
        addGptMovieResult({ movieNames: titles, movieResults: tmdbResults })
      )
    } catch (err) {
      console.error('GPT search failed:', err)
      setError('Something went wrong with the search. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={LOGIN_BG}
        alt="Background"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex justify-center pt-[35vh]">
        <form
          onSubmit={handleSearch}
          className="flex w-11/12 gap-3 rounded-lg bg-black/80 p-3 shadow-xl ring-1 ring-white/10 md:w-1/2"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you feel like watching today?"
            className="flex-1 rounded-md bg-white/95 px-4 py-3 text-black outline-none placeholder:text-gray-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-gradient-to-r from-[#e50914] to-[#b0060f] px-6 py-3 font-semibold text-white transition hover:from-[#f6121d] hover:to-[#c50811] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Searching…' : 'Search'}
          </button>
        </form>
      </div>

      {error && (
        <p className="relative z-10 mt-4 text-center font-semibold text-red-500">
          {error}
        </p>
      )}

      {/* Results: one row per GPT-suggested title, using the TMDB matches. */}
      {movieNames && (
        <div className="relative z-10 mt-6 space-y-6 pb-12">
          {movieNames.map((name, index) => (
            <MovieList
              key={name}
              title={name}
              movies={movieResults?.[index]}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default GptSearch

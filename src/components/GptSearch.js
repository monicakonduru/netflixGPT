import React, { useState } from 'react'
import { LOGIN_BG } from '../utils/constants'

// GPT search view shown on /browse when the header's "GPT Search" toggle is on.
// The submit handler is a placeholder until the GPT/TMDB query is wired up.
function GptSearch() {
  const [query, setQuery] = useState('')

  const handleSearch = (event) => {
    event.preventDefault()
    // TODO: send `query` to the GPT + TMDB search pipeline.
    console.log('GPT search:', query)
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
            className="rounded-md bg-gradient-to-r from-[#e50914] to-[#b0060f] px-6 py-3 font-semibold text-white transition hover:from-[#f6121d] hover:to-[#c50811] active:scale-95"
          >
            Search
          </button>
        </form>
      </div>
    </>
  )
}

export default GptSearch

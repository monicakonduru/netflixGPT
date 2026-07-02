import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    // The movie titles GPT suggested for the last query.
    movieNames: null,
    // Parallel array of TMDB result lists (one per name in movieNames).
    movieResults: null,
  },
  reducers: {
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export const { addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;

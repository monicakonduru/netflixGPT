// Shared static assets and config used across the app.

// Netflix wordmark logo (used in the header and signup page).
export const NETFLIX_LOGO =
  'https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-05-14/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'

// Full-bleed background image on the login and signup screens (served from /public).
export const LOGIN_BG = '/loginBg.png'

// Default avatar shown in the header for a signed-in user (served from /public).
export const AVATAR = '/user.png'


// Static profiles shown in the avatar dropdown, mirroring the Netflix UI.
export const PROFILES = [
  { name: 'Profile 1', img: '/profile1.png' },
  { name: 'Profile 2', img: '/profile1.png' },
  { name: 'Children', color: 'bg-gradient-to-br from-pink-400 to-yellow-300', kids: true },
]

// TMDB (The Movie Database) API config.
// Read-access bearer token used to authenticate every TMDB request.
export const TMDB_BEARER_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmQ5ZmE1YjliNjkzYTJhMjI2YTAwMTI0NTE0Y2I5NyIsIm5iZiI6MTc4MjcyODIzMi42MTQsInN1YiI6IjZhNDI0NjI4OGY4MWY0ZGVlZWI0YmUxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pbA5WjCdPrjWkXmI-D_iFWL55--e2iH3VgYJ-y1D7SU'

// Shared fetch() options for authenticated TMDB GET requests.
export const TMDB_API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + TMDB_BEARER_TOKEN,
  },
}

// Base URL for TMDB poster/backdrop images (append a size + file path).
export const TMDB_IMG_CDN_URL = 'https://image.tmdb.org/t/p/w500'

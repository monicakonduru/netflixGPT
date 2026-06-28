import React from 'react'

// Full-screen spinner shown while we wait for Firebase to tell us whether
// there's an active session.
const Loader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-black">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#e50914] border-t-transparent" />
  </div>
)

export default Loader

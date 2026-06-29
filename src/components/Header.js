import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { NETFLIX_LOGO, AVATAR, PROFILES } from '../utils/constants'

const Header = () => {
  const user = useSelector((store) => store.user)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Close the dropdown when clicking anywhere outside of it.
  useEffect(() => {
    if (!menuOpen) return

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  const handleSignOut = () => {
    // The auth-state listener in Body handles store cleanup + redirect to "/".
    signOut(auth).catch((error) =>
      console.error('Sign out failed:', error.code, error.message)
    )
  }

  // Login screen (no signed-in user) keeps the plain centered logo header.
  if (!user) {
    return (
      <div className="absolute z-10 w-full bg-gradient-to-b from-black/80 px-8 py-2">
        <img className="w-44" src={NETFLIX_LOGO} alt="Netflix Logo" />
      </div>
    )
  }

  return (
    <header className="absolute z-20 flex w-full items-center justify-between bg-gradient-to-b from-black/90 to-transparent px-12 py-4">
      {/* Left: logo + primary navigation */}
      <div className="flex items-center gap-8">
        <img className="w-28" src={NETFLIX_LOGO} alt="Netflix Logo" />
      </div>

      {/* Right: search, profile shortcut, notifications, avatar menu */}
      <div className="flex items-center gap-6 text-white">
        <button aria-label="Search" className="transition hover:text-gray-300">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        <span className="hidden text-sm sm:inline">Children</span>

        <button aria-label="Notifications" className="relative transition hover:text-gray-300">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#e50914] px-1 text-[10px] font-bold">
            2
          </span>
        </button>

        {/* Avatar + dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-2"
          >
            <img className="h-8 w-8 rounded" src={AVATAR} alt="User" />
            <svg
              className={
                'h-3 w-3 transition-transform ' + (menuOpen ? 'rotate-180' : '')
              }
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-60 rounded border border-white/10 bg-black/95 py-2 text-sm text-white shadow-lg">
              {PROFILES.map((profile) => (
                <button
                  key={profile.name}
                  className="flex w-full items-center gap-3 px-4 py-2 hover:underline"
                >
                  {profile.img ? (
                    <img
                      className="h-7 w-7 rounded"
                      src={profile.img}
                      alt={profile.name}
                    />
                  ) : (
                    <span
                      className={
                        'flex h-7 w-7 items-center justify-center rounded text-[10px] font-bold ' +
                        profile.color
                      }
                    >
                      {profile.kids ? 'kids' : ''}
                    </span>
                  )}
                  {profile.name}
                </button>
              ))}

              <div className="mt-1 border-t border-white/10" />

              <button className="flex w-full items-center gap-3 px-4 py-2 hover:underline">
                <span className="text-base">✎</span> Manage Profiles
              </button>
              <button className="flex w-full items-center gap-3 px-4 py-2 hover:underline">
                <span className="text-base">⇄</span> Transfer Profile
              </button>
              <button className="flex w-full items-center gap-3 px-4 py-2 hover:underline">
                <span className="text-base">☻</span> Account
              </button>
              <button className="flex w-full items-center gap-3 px-4 py-2 hover:underline">
                <span className="text-base">?</span> Help Centre
              </button>

              <div className="mt-1 border-t border-white/20" />

              <button
                onClick={handleSignOut}
                className="w-full px-4 py-3 text-center hover:underline"
              >
                Sign out of Netflix
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

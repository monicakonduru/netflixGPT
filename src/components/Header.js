import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { toggleGptSearchView } from '../utils/appSlice'
import { NETFLIX_LOGO, AVATAR, PROFILES } from '../utils/constants'

const Header = () => {
  const user = useSelector((store) => store.user)
  const gptSearchView = useSelector((store) => store.app.gptSearchView)
  const dispatch = useDispatch()
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
        <button
          onClick={() => dispatch(toggleGptSearchView())}
          aria-pressed={gptSearchView}
          className={
            'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold shadow-lg shadow-black/40 ring-1 transition active:scale-95 ' +
            (gptSearchView
              ? 'bg-white text-[#e50914] ring-white/60 hover:bg-gray-100'
              : 'bg-gradient-to-r from-[#e50914] to-[#b0060f] text-white ring-white/10 hover:from-[#f6121d] hover:to-[#c50811] hover:shadow-red-900/40')
          }
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 3l1.5 3.5L10 8 6.5 9.5 5 13 3.5 9.5 0 8l3.5-1.5z" transform="translate(4 1)" />
            <path d="M18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9z" />
          </svg>
          {gptSearchView ? 'Home' : 'GPT Search'}
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

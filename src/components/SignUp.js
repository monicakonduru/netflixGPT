import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { validateForm } from '../utils/validate'
import { authErrorMessage } from '../utils/authErrors'
import Loader from './Loader'

const SignUp = () => {
  const navigate = useNavigate()
  const user = useSelector((store) => store.user)
  const authChecked = useSelector((store) => store.app.authChecked)
  const email = useRef(null)
  const password = useRef(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Already signed in? Don't show the signup form — go to browse.
  useEffect(() => {
    if (authChecked && user) navigate('/browse')
  }, [authChecked, user, navigate])

  // Create the Firebase account, then drop the new user straight into /browse.
  const handleGetStarted = async (e) => {
    e.preventDefault()

    const emailValue = email.current.value
    const passwordValue = password.current.value

    const message = validateForm(emailValue, passwordValue)
    setErrorMessage(message)
    if (message) return

    setIsSubmitting(true)
    try {
      await createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      navigate('/browse')
    } catch (error) {
      console.error('Sign up failed:', error.code, error.message)
      setErrorMessage(authErrorMessage(error.code))
    } finally {
      setIsSubmitting(false)
    }
  }

  // Don't flash the signup form before we know if a session exists.
  if (!authChecked) return <Loader />

  return (
    <div className="relative min-h-screen w-full">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="loginBg.png"
        alt="Background"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12">
        <img
          className="w-32 md:w-44"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-05-14/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix Logo"
        />

        <div className="flex items-center gap-3 md:gap-4">
          <Link
            to="/"
            className="rounded bg-[#e50914] px-4 py-1.5 text-sm font-medium text-white transition hover:bg-[#f6121d]"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-150px)] max-w-3xl flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          Unlimited movies, shows, and more
        </h1>
        <p className="mt-4 text-lg font-medium md:text-2xl">
          Starts at ₹149. Cancel at any time.
        </p>
        <p className="mt-6 text-base md:text-lg">
          Ready to watch? Enter your email and a password to create your
          membership.
        </p>

        <form
          onSubmit={handleGetStarted}
          className="mt-5 flex w-full max-w-2xl flex-col gap-3"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              ref={email}
              type="email"
              placeholder="Email address"
              className="w-full rounded border border-white/40 bg-black/40 px-5 py-4 text-base text-white outline-none placeholder:text-gray-300 focus:border-white"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="w-full rounded border border-white/40 bg-black/40 px-5 py-4 text-base text-white outline-none placeholder:text-gray-300 focus:border-white"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded bg-[#e50914] px-7 py-4 text-xl font-medium text-white transition hover:bg-[#f6121d] disabled:opacity-60"
            >
              {isSubmitting ? 'Please wait…' : 'Get Started'}
              {!isSubmitting && <span aria-hidden="true">›</span>}
            </button>
          </div>

          {errorMessage && (
            <p className="text-left text-sm font-medium text-[#e87c03]">
              {errorMessage}
            </p>
          )}
        </form>
      </main>
    </div>
  )
}

export default SignUp

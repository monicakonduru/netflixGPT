import React, { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../utils/firebase'
import { validateForm } from '../utils/validate'

// Turn Firebase auth error codes into messages we can show the user.
const authErrorMessage = (code) => {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password.'
    case 'auth/email-already-in-use':
      return 'An account already exists with this email. Try signing in.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

const LoginForm = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // When the user arrives from the SignUp landing page's "Get Started" button,
  // we receive their email and a signup flag via router state. A direct visit to
  // this route means they're signing in.
  const isSignUp = Boolean(location.state?.signup)
  const prefilledEmail = location.state?.email ?? ''

  const email = useRef(null)
  const password = useRef(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const emailValue = email.current.value
    const passwordValue = password.current.value

    const message = validateForm(emailValue, passwordValue)
    setErrorMessage(message)
    if (message) return

    setIsSubmitting(true)
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      } else {
        await signInWithEmailAndPassword(auth, emailValue, passwordValue)
      }
      navigate('/browse')
    } catch (error) {
      setErrorMessage(authErrorMessage(error.code))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-black/75 px-16 py-12 text-white"
    >
      <h1 className="mb-7 text-3xl font-bold">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </h1>

      <input
        ref={email}
        type="text"
        defaultValue={prefilledEmail}
        placeholder="Email or phone number"
        className="mb-4 w-full rounded bg-[#333] px-5 py-4 text-sm outline-none focus:bg-[#454545]"
      />
      <input
        ref={password}
        type="password"
        placeholder="Password"
        className="mb-6 w-full rounded bg-[#333] px-5 py-4 text-sm outline-none focus:bg-[#454545]"
      />

      {errorMessage && (
        <p className="mb-4 text-sm font-medium text-[#e50914]">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mb-3 w-full rounded bg-[#e50914] py-3 font-semibold transition hover:bg-[#f6121d] disabled:opacity-60"
      >
        {isSubmitting
          ? 'Please wait…'
          : isSignUp
            ? 'Sign Up'
            : 'Sign In'}
      </button>

      <div className="mb-12 flex items-center justify-between text-sm text-[#b3b3b3]">
        <label className="flex items-center gap-2">
          <input type="checkbox" defaultChecked className="accent-[#b3b3b3]" />
          Remember me
        </label>
        <span className="cursor-pointer hover:underline">Need help?</span>
      </div>

      <p className="mb-4 text-[#737373]">
        New to Netflix?{' '}
        <Link
          to="/signup"
          className="cursor-pointer font-medium text-white hover:underline"
        >
          Sign up now
        </Link>
      </p>
      <p className="text-xs text-[#8c8c8c]">
        This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
        <span className="cursor-pointer text-blue-500 hover:underline">
          Learn more.
        </span>
      </p>
    </form>
  )
}

export default LoginForm

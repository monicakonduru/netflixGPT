import React, { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
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
    case 'auth/account-exists-with-different-credential':
      return 'This email is already linked to a different sign-in method.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

const googleProvider = new GoogleAuthProvider()

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

  // Open Google's popup and let it sign the user in (or create their account if
  // they don't have one yet).
  const handleGoogleSignIn = async () => {
    setErrorMessage(null)
    setIsSubmitting(true)
    try {
      await signInWithPopup(auth, googleProvider)
      navigate('/browse')
    } catch (error) {
      // The user simply dismissing the popup isn't an error worth showing.
      if (
        error.code !== 'auth/popup-closed-by-user' &&
        error.code !== 'auth/cancelled-popup-request'
      ) {
        setErrorMessage(authErrorMessage(error.code))
      }
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

      <div className="my-3 flex items-center gap-3 text-xs text-[#b3b3b3]">
        <span className="h-px flex-1 bg-[#404040]" />
        OR
        <span className="h-px flex-1 bg-[#404040]" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isSubmitting}
        className="mb-6 flex w-full items-center justify-center gap-3 rounded bg-white py-3 font-semibold text-[#131313] transition hover:bg-gray-200 disabled:opacity-60"
      >
        <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden="true">
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          />
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          />
        </svg>
        Sign in with Google
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

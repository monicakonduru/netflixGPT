import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import LoginForm from './LoginForm'
import Loader from './Loader'

export const Login = () => {
  const user = useSelector((store) => store.user)
  const authChecked = useSelector((store) => store.app.authChecked)
  const navigate = useNavigate()

  // Already signed in? Skip the login screen and go straight to browse.
  useEffect(() => {
    if (authChecked && user) navigate('/browse')
  }, [authChecked, user, navigate])

  // Don't flash the login form before we know if a session exists.
  if (!authChecked) return <Loader />

  return (
    <div className="relative h-screen w-full">
      <Header />

      <img
        className="absolute inset-0 h-full w-full object-cover"
        src= "loginBg.png"
        alt="Login Background"
      />
      <div className="absolute inset-0 bg-black/50" />

      <LoginForm />
    </div>
  )
}

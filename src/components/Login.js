import React from 'react'
import Header from './Header'
import LoginForm from './LoginForm'

export const Login = () => {
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

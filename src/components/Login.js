import React from 'react'
import Header from './Header'

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

      <form className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-black/75 px-16 py-12 text-white">
        <h1 className="mb-7 text-3xl font-bold">Sign In</h1>

        <input
          type="text"
          placeholder="Email or phone number"
          className="mb-4 w-full rounded bg-[#333] px-5 py-4 text-sm outline-none focus:bg-[#454545]"
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded bg-[#333] px-5 py-4 text-sm outline-none focus:bg-[#454545]"
        />

        <button className="mb-3 w-full rounded bg-[#e50914] py-3 font-semibold transition hover:bg-[#f6121d]">
          Sign In
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
          <span className="cursor-pointer font-medium text-white hover:underline">
            Sign up now
          </span>
        </p>
        <p className="text-xs text-[#8c8c8c]">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
          <span className="cursor-pointer text-blue-500 hover:underline">
            Learn more.
          </span>
        </p>
      </form>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
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
          <div className="flex items-center gap-1 rounded border border-white/40 bg-black/40 px-2 py-1 text-sm text-white">
            <span aria-hidden="true">🌐</span>
            <select className="cursor-pointer bg-transparent outline-none">
              <option className="text-black">English</option>
              <option className="text-black">हिन्दी</option>
            </select>
          </div>
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
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        <form className="mt-5 flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded border border-white/40 bg-black/40 px-5 py-4 text-base text-white outline-none placeholder:text-gray-300 focus:border-white"
          />
          <button className="flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded bg-[#e50914] px-7 py-4 text-xl font-medium text-white transition hover:bg-[#f6121d]">
            Get Started
            <span aria-hidden="true">›</span>
          </button>
        </form>
      </main>
    </div>
  )
}

export default SignUp

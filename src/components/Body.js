import React from 'react'
import { Login } from './Login'
import Browser from './Browser'
import SignUp from './SignUp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Body = () => {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/browse",
      element: <Browser />,
    }
  ])
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default Body
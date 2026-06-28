import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { Login } from './Login'
import Browser from './Browser'
import SignUp from './SignUp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { addUser, removeUser } from '../utils/userSlice'
import { setAuthChecked } from '../utils/appSlice'

const Body = () => {
  const dispatch = useDispatch()

  // One listener for the whole app: fires after email signup, email login,
  // Google sign-in, logout, and on every page refresh. Whenever the auth
  // state changes we push the (serializable) user details into the store.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user
        dispatch(addUser({ uid, email, displayName, photoURL }))
      } else {
        dispatch(removeUser())
      }
      // Auth state is now resolved — guards can safely act on it.
      dispatch(setAuthChecked())
    })

    // Detach the listener when Body unmounts to avoid leaks.
    return () => unsubscribe()
  }, [dispatch])

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
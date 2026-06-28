import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

function Browser() {
  const user = useSelector((store) => store.user)
  const authChecked = useSelector((store) => store.app.authChecked)
  const navigate = useNavigate()

  // Protected route: once auth is resolved, kick out anyone not signed in.
  useEffect(() => {
    if (authChecked && !user) navigate('/')
  }, [authChecked, user, navigate])

  // Wait for Firebase before deciding — avoids bouncing a logged-in user.
  if (!authChecked) return <Loader />

  return (
    <div>Browser</div>
  )
}

export default Browser
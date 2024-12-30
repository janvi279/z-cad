import { Outlet, Navigate } from 'react-router-dom'
import { getToken } from '../../utils/cookies/Cookies'

export default function PrivateRoute() {
  const token = getToken() // Check if the user is authenticated

  if (!token) {
    // If not logged in, redirect to login page
    return <Navigate to='/login' />
  }

  // If the user is authenticated, render the requested component
  return <Outlet />
}

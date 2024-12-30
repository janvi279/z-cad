import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../../utils/cookies/Cookies'

export default function PublicRoute() {
  return getToken() ? <Navigate to='/' /> : <Outlet />
}

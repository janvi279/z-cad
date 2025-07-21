import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PageNotFound from './pages/PageNotFound'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/Auth/ForgotPassword/ResetPassword'

import DefaultLayout from './Layout/DefualtLayout'

import PublicRoute from './Components/custom/PublicRoute'
import PrivateRoute from './Components/custom/PrivateRoute'

import AllRoutes from './Navigation/index'
import { Toaster } from 'react-hot-toast'

import { AuthProvider } from './Context/AuthContext'
import { LoadingProvider, useLoading } from './Context/LoadingContext'
import FullPageLoader from './Components/common/FullPageLoader'

const AppContent = () => {
  const { loading } = useLoading()

  return (
    <>
      {loading && <FullPageLoader />}
      <Toaster />
      <Routes>
        <Route path='/*' element={<PageNotFound />} />
        <Route element={<PublicRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<DefaultLayout />}>
            {AllRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>
      </Routes>
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  )
}

export default App

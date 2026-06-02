import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PageNotFound from './pages/PageNotFound'
import Login from './pages/Auth/Login/Login'
import AuthorRegister from './pages/Auth/Register/Register'
import DistributorRegister from './pages/Home/distributor/register'
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
import DistributorLogin from './pages/Home/distributor/login'

import DistributorDashboard from './pages/Home/distributor'
import RegisterSelection from './pages/RegisterSelection'

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
          <Route   path="/author-register" element={<AuthorRegister />} />
          <Route   path="/distributor-register" element={<DistributorRegister />} />
           <Route   path="/register-selection" element={<RegisterSelection />} />
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
        <Route path='/distributor/login' element={<DistributorLogin />} />

        <Route
          path='/distributor/dashboard'
          element={
            
              <DistributorDashboard />
           
          }
        />
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

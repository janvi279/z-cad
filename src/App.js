import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PageNotFound from './pages/PageNotFound'

import SignUp from './pages/Auth/SignUp/SignUp'
import Login from './pages/Auth/Login/Login'

import DefaultLayout from './Layout/DefualtLayout'

import PublicRoute from './Components/custom/PublicRoute'
import PrivateRoute from './Components/custom/PrivateRoute'

import AllRoutes from './Navigation/index'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='/*' element={<PageNotFound />} />
        <Route element={<PublicRoute />}>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<DefaultLayout />}>
            {AllRoutes.map((route, index) => {
              return (
                <Route key={index} path={route.path} element={route.element} />
              )
            })}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

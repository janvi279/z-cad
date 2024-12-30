import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { setToken } from '../../../utils/cookies/Cookies'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import axiosCommonInstance from '../.././../utils/axios/axiosCommanInstance'

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    let valid = true
    if (!email) {
      setEmailError('Email is required')
      valid = false
    } else {
      setEmailError('')
    }

    if (!password) {
      setPasswordError('Password is required')
      valid = false
    } else {
      setPasswordError('')
    }

    return valid
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setToken("zcad")
    navigate('/')
    // setLoading(true)

    // if (validateForm()) {
    //   axiosCommonInstance
    //     .post('/auth/login', {
    //       email,
    //       password,
    //     })
    //     .then((res) => {
    //       setToken(res.data?.token) // Save the token in cookies

    //       // Redirect to the homepage after successful login
    //       navigate('/')
    //     })
    //     .catch((err) => {
    //       console.log('err :>> ', err)
    //     })
    //     .finally(() => {
    //       setLoading(false)
    //     })
    // }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setEmailError('')
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setPasswordError('')
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white p-4'>
      <div className='w-full max-w-[400px] mx-auto'>
        <div className='flex flex-col items-center gap-6 mb-12'>
          <h1 className='text-4xl font-serif'>ZCAD</h1>
        </div>
        <div className='w-full'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <label className='block text-lg font-medium leading-6 text-gray-900'>
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                value={email}
                onChange={handleEmailChange}
                className='block p-2 w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none sm:text-sm sm:leading-6'
                placeholder='Enter Email'
              />
              {emailError && (
                <p className='text-red-600 text-sm'>{emailError}</p>
              )}
            </div>
            <div className='space-y-2 relative'>
              <label className='block text-lg font-medium leading-6 text-gray-900'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                autoComplete='current-password'
                value={password}
                onChange={handlePasswordChange}
                className='block p-2 w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 outline-none sm:text-sm sm:leading-6'
                placeholder='Enter Password'
              />
              <div
                className='absolute right-3 top-[35px] cursor-pointer'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FiEyeOff className='text-black' />
                ) : (
                  <FiEye className='text-black' />
                )}
              </div>
              {passwordError && (
                <p className='text-red-600 text-sm'>{passwordError}</p>
              )}
            </div>
            {/* <div className='text-right'>
              <Link
                to='/forgot-password'
                className='text-sm text-blue-500 hover:text-blue-600'
              >
                Forgot password?
              </Link>
            </div> */}
            <button
              type='submit'
              disabled={!!emailError || !!passwordError || loading}
              className='w-full py-3 px-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors'
            >
              {loading ? (
                <div className='w-5 h-5 mx-auto border-2 border-white border-solid rounded-full loader animate-spin border-t-transparent'></div>
              ) : (
                'Log in'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

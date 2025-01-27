import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const ResetPassword = () => {
  const [otp, setOtp] = useState('')
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const navigate = useNavigate()

  const handleOtpSubmit = (e) => {
    e.preventDefault()

    if (otp.length === 6) {
        setIsOtpVerified(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (newPassword === confirmPassword) {
      navigate('/login')
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-center mb-6'>
          Reset Your Password
        </h2>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          {!isOtpVerified ? (
            <form onSubmit={handleOtpSubmit}>
              <div className='mb-4'>
                <label
                  htmlFor='otp'
                  className='block text-lg font-medium leading-6 text-gray-900'
                >
                  Enter OTP
                </label>
                <div className='mt-2'>
                  <input
                    id='otp'
                    name='otp'
                    type='text'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder='Enter OTP'
                    required
                    maxLength='6'
                    className='block p-2 w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 outline-none sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='mt-4'>
                <button
                  type='submit'
                  className='w-full py-3 px-4 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors'
                >
                  Verify OTP
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label
                  htmlFor='newPassword'
                  className='block text-lg font-medium leading-6 text-gray-900'
                >
                  New Password
                </label>
                <div className='mt-2 relative'>
                  <input
                    id='newPassword'
                    name='newPassword'
                    type={isNewPasswordVisible ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder='Enter new password'
                    required
                    className='block p-2 w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 outline-none sm:text-sm sm:leading-6'
                  />
                  <div
                    onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                    className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'
                  >
                    {isNewPasswordVisible ? (
                      <AiOutlineEyeInvisible size={18} />
                    ) : (
                      <AiOutlineEye size={18} />
                    )}
                  </div>
                </div>
              </div>

              <div className='mb-4'>
                <label
                  htmlFor='confirmPassword'
                  className='block text-lg font-medium leading-6 text-gray-900'
                >
                  Confirm New Password
                </label>
                <div className='mt-2 relative'>
                  <input
                    id='confirmPassword'
                    name='confirmPassword'
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Confirm new password'
                    required
                    className='block p-2 w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 outline-none sm:text-sm sm:leading-6'
                  />
                  <div
                    onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'
                  >
                    {isConfirmPasswordVisible ? (
                      <AiOutlineEyeInvisible size={18} />
                    ) : (
                      <AiOutlineEye size={18} />
                    )}
                  </div>
                </div>
              </div>

              <div className='mt-4'>
                <button
                  type='submit'
                  className='w-full py-3 px-4 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors'
                >
                  Reset Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetPassword

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../../utils/cookies/cookies'

const NotAuthrized = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <>
      <h2 className='m-4'>Not Authorized to View This Page</h2>
      <div className='m-4'>
        <button
          className='rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
          onClick={handleBack}
        >
          Back To Login
        </button>
      </div>
    </>
  )
}

export default NotAuthrized

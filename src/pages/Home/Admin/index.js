import React, { useEffect, useState } from 'react'
import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const [data, setData] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axiosAuthInstance.get('dashboard')
      if (response && response.status === 200) {
        setData(response.data.result)
      }
    } catch (error) {
      console.error('Fetching data error:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className='grid grid-cols-3 md:grid-cols-2 gap-3'>
        <div className='flex gap-5'>
          <Link to='/author-info'>
            <div className='h-28 bg-white rounded-md shadow-md flex flex-col items-center justify-center px-3 py-3'>
              <div className='font-semibold  text-lg'>Total Authors</div>
              {data.authors && (
                <div className='text-primary-500 font-semibold text-2xl mt-2'>
                  {data.authors}
                </div>
              )}
            </div>
          </Link>
          <Link to='/author-book-info'>
            <div className='h-28 bg-white rounded-md shadow-md flex flex-col items-center justify-center px-3 py-3'>
              <div className='font-semibold  text-lg'>Total book Request</div>
              {data.booksRequest && (
                <div className='text-primary-500 font-semibold text-2xl mt-2'>
                  {data.booksRequest}
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard

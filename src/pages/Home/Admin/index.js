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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

  <Link to="/author-info">
    <div className="h-32 bg-white rounded-lg shadow-md flex flex-col justify-center items-center hover:shadow-lg transition">
      <h3 className="font-semibold text-lg">
        Total Authors
      </h3>

      <p className="text-primary-500 text-3xl font-bold mt-2">
        {data.authors || 0}
      </p>
    </div>
  </Link>

  <Link to="/author-book-info">
    <div className="h-32 bg-white rounded-lg shadow-md flex flex-col justify-center items-center hover:shadow-lg transition">
      <h3 className="font-semibold text-lg">
        Total Author Books
      </h3>

      <p className="text-primary-500 text-3xl font-bold mt-2">
        {data.books || 0}
      </p>
    </div>
  </Link>

  <Link to="/Author-withdrawal-request">
    <div className="h-32 bg-white rounded-lg shadow-md flex flex-col justify-center items-center hover:shadow-lg transition">
      <h3 className="font-semibold text-lg text-center">
        Author Withdrawal Requests
      </h3>

      <p className="text-primary-500 text-3xl font-bold mt-2">
        {data.walletreq || 0}
      </p>
    </div>
  </Link>

  <Link to="/distributor-info">
    <div className="h-32 bg-white rounded-lg shadow-md flex flex-col justify-center items-center hover:shadow-lg transition">
      <h3 className="font-semibold text-lg">
        Total Distributors
      </h3>

      <p className="text-primary-500 text-3xl font-bold mt-2">
        {data.distributors || 0}
      </p>
    </div>
  </Link>

  <Link to="/distributor-withdrawal-request">
    <div className="h-32 bg-white rounded-lg shadow-md flex flex-col justify-center items-center hover:shadow-lg transition">
      <h3 className="font-semibold text-lg text-center">
        Distributor Withdrawal Requests
      </h3>

      <p className="text-primary-500 text-3xl font-bold mt-2">
        {data.distributorWalletReq || 0}
      </p>
    </div>
  </Link>

</div>
    </>
  )
}

export default AdminDashboard

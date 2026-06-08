import { FaRegUser, FaCartPlus } from 'react-icons/fa'
import { FiBox } from 'react-icons/fi'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance'
import { useLoading } from '../../../Context/LoadingContext'

const WelcomeBox = () => {
  const { profileData } = useContext(AuthContext)
  const { setLoading } = useLoading()
  const [salesData, setSalesData] = useState({
    grossSales: 0,
    itemsSold: 0,
    ordersReceived: 0,
    lastWithdrawalDate: null,
  })

  const [canWithdraw, setCanWithdraw] = useState(false)
  console.log("🚀 ~ WelcomeBox ~ canWithdraw:", canWithdraw)

  const fetchSalesData = async () => {
    setLoading(true)
    try {
      const response = await axiosAuthInstance.get('shopify/order')
      if (response.status !== 200) throw new Error('Network response not ok')

      const orders = response.data.orders || []
      let grossSales = 0
      let itemsSold = 0
      let authorOrderCount = 0

      const currentDate = new Date()

      orders.forEach((order) => {
        const orderDate = new Date(order.orderCreate)
        const isCurrentMonth =
          orderDate.getMonth() === currentDate.getMonth() &&
          orderDate.getFullYear() === currentDate.getFullYear()
        if (isCurrentMonth) {
          authorOrderCount += 1
          grossSales += parseFloat(order.TotalPrice)

          itemsSold += order.itemsSold ? parseInt(order.itemsSold) : 0
        }
      })

      // For example, lastWithdrawalDate can come from backend API
      const lastWithdrawalDate = response.data.lastWithdrawalDate || null

      setSalesData({
        grossSales,
        itemsSold,
        ordersReceived: authorOrderCount,
        lastWithdrawalDate,
      })

      // Check if withdrawal is allowed
      if (lastWithdrawalDate) {
        const last = new Date(lastWithdrawalDate)
        const allowed =
          currentDate.getMonth() !== last.getMonth() ||
          currentDate.getFullYear() !== last.getFullYear()
        setCanWithdraw(allowed)
      } else {
        setCanWithdraw(true) // never withdrawn before
      }
    } catch (error) {
      console.error('Error fetching sales data:', error)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchSalesData()
  }, [])

  return (
    <div className='p-6 space-y-6'>
      {/* Welcome Section */}
      <div className='flex items-start gap-4'>
        <div className='h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center'>
          {profileData?.avtar ? (
            <img
              src={profileData.avtar}
              alt='Profile'
              className='h-24 w-24 rounded-full object-cover'
            />
          ) : (
            <FaRegUser className='h-8 w-8 text-gray-500' />
          )}
        </div>
        <div className='space-y-1'>
          <h1 className='text-2xl font-medium text-sky-500'>
            Welcome to the ZCAD PUBLICATION Dashboard
          </h1>
          <p className='text-gray-600'>
            {profileData?.firstName} {profileData?.lastName}
          </p>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className='grid gap-4 md:grid-cols-3'>
        <div className='flex shadow-md rounded-lg overflow-hidden'>
          <div className='bg-rose-400 p-4 flex items-center justify-center'>
            <span className='text-white text-xl'>₹</span>
          </div>
          <div className='bg-white p-4 flex-1'>
            <p className='text-lg font-medium'>
              ₹{salesData.grossSales.toFixed(2)}
            </p>
            <p className='text-sm text-gray-500'>Gross sales this month</p>
          </div>
        </div>
        <div className='flex shadow-md rounded-lg overflow-hidden'>
          <div className='bg-yellow-400 p-4 flex items-center justify-center'>
            <FiBox className='text-white text-xl' />
          </div>
          <div className='bg-white p-4 flex-1'>
            <p className='text-lg font-medium'>{salesData.itemsSold} items</p>
            <p className='text-sm text-gray-500'>Sold this month</p>
          </div>
        </div>
        <div className='flex shadow-md rounded-lg overflow-hidden'>
          <div className='bg-teal-400 p-4 flex items-center justify-center'>
            <FaCartPlus className='text-white text-xl' />
          </div>
          <div className='bg-white p-4 flex-1'>
            <p className='text-lg font-medium'>
              {salesData.ordersReceived} orders
            </p>
            <p className='text-sm text-gray-500'>Received this month</p>
          </div>
        </div>
        {/* <div className='flex shadow-md rounded-lg overflow-hidden'>
          <div className='bg-green-400 p-4 flex items-center justify-center'>
            <FaCartPlus className='text-white text-xl' />
          </div>
          <div className='bg-white p-4 flex-1'>
            <p className='text-lg font-medium'>₹{salesData.grossSales.toFixed(2)}</p>
            <p className='text-sm text-gray-500'>Author Earnings</p>
          </div>
        </div> */}
      </div>

      {/* Withdrawal Section */}
      {/* <div className='grid gap-4 md:grid-cols-3 items-center'>
        <div className='flex shadow-md rounded-lg overflow-hidden'>
          <div className='bg-teal-400 p-4 flex items-center justify-center'>
            <FaCartPlus className='text-white text-xl' />
          </div>
          <div className='bg-white p-4 flex-1'>
            <p className='text-lg font-medium'>₹{salesData.grossSales.toFixed(2)}</p>
            <p className='text-sm text-gray-500'>Available for Withdrawal</p>
          </div>
        </div>

        <div className='flex shadow-md rounded-lg overflow-hidden'>
          <div className='bg-teal-400 p-4 flex items-center justify-center'>
            <FaCartPlus className='text-white text-xl' />
          </div>
          <div className='bg-white p-4 flex-1'>
            <p className='text-lg font-medium'>
              {salesData.lastWithdrawalDate ? new Date(salesData.lastWithdrawalDate).toLocaleDateString() : 'N/A'}
            </p>
            <p className='text-sm text-gray-500'>Last Withdrawal</p>
          </div>
        </div>

        <button
          onClick={handleWithdraw}
          disabled={!canWithdraw}
          className={`px-4 w-24 py-2 rounded text-white ${canWithdraw ? 'bg-black rounded' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Withdraw
        </button>
      </div> */}
    </div>
  )
}

export default WelcomeBox

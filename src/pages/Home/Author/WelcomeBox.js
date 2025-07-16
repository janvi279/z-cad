import { FaRegUser, FaCartPlus } from 'react-icons/fa'
import { FiBox } from 'react-icons/fi'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance'

const WelcomeBox = () => {
  const { profileData } = useContext(AuthContext)
  const [salesData, setSalesData] = useState({
    grossSales: 0,
    itemsSold: 0,
    ordersReceived: 0,
  })

  const fetchSalesData = async () => {
    try {
      const response = await axiosAuthInstance.get('shopify/salesByDate')

      // Check if the response is successful
      if (response.status !== 200) {
        throw new Error('Network response not ok')
      }

      const data = response.data // Use response.data directly
      const orders = data.orders

      // Calculate gross sales, items sold, and orders received
      let grossSales = 0
      let itemsSold = 0

      orders.forEach((order) => {
        const orderDate = new Date(order.created_at)
        const currentDate = new Date()

        // Check if the order was created in the current month
        if (
          orderDate.getMonth() === currentDate.getMonth() &&
          orderDate.getFullYear() === currentDate.getFullYear()
        ) {
          grossSales += parseFloat(order.total_price)
          itemsSold += order.line_items.reduce(
            (total, item) => total + item.quantity,
            0,
          )
        }
      })

      setSalesData({
        grossSales,
        itemsSold,
        ordersReceived: orders.length, // Total orders received
      })
    } catch (error) {
      console.error('Error fetching sales data:', error)
    }
  }

  useEffect(() => {
    fetchSalesData()
  }, [])

  return (
    <div className='p-6 space-y-6'>
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

      <div className='grid gap-4 md:grid-cols-3'>
        <div className='flex shadow-md rounded-lg overflow-hidden'>
          <div className='bg-rose-400 p-4 flex items-center justify-center'>
            <span className='text-white text-xl'>₹</span>
          </div>
          <div className='bg-white p-4 flex-1'>
            <p className='text-lg font-medium'>
              ₹{salesData.grossSales.toFixed(2)}
            </p>
            <p className='text-sm text-gray-500'>gross sales in this month</p>
          </div>
        </div>

        <div className='flex shadow-md rounded-lg overflow-hidden'>
          <div className='bg-yellow-400 p-4 flex items-center justify-center'>
            <span className='text-white text-xl'>
              <FiBox />
            </span>
          </div>
          <div className='bg-white p-4 flex-1'>
            <p className='text-lg font-medium'>{salesData.itemsSold} items</p>
            <p className='text-sm text-gray-500'>sold in this month</p>
          </div>
        </div>

        <div className='flex shadow-md rounded-lg overflow-hidden'>
          <div className='bg-teal-400 p-4 flex items-center justify-center'>
            <span className='text-white text-xl'>
              <FaCartPlus />
            </span>
          </div>
          <div className='bg-white p-4 flex-1'>
            <p className='text-lg font-medium'>
              {salesData.ordersReceived} orders
            </p>
            <p className='text-sm text-gray-500'>received in this month</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBox
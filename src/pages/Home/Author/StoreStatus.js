import React, { useEffect, useState } from 'react'
import { BiTime, BiMenu, BiDownArrow, BiX } from 'react-icons/bi'
import { FaTruck } from 'react-icons/fa'
import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance'

const StoreStatus = () => {
  const [statusCounts, setStatusCounts] = useState({
    processing: 0,
    awaitingFulfillment: 0,
    lowInStock: '-', // Placeholder, can be changed later
    outOfStock: '-', // Placeholder
  })

  const fetchOrderStats = async () => {
    try {
      const res = await axiosAuthInstance.get('shopify/order') // Replace with actual endpoint
      const orders = res.data.orders || []

      const processing = orders.length
      const awaitingFulfillment = orders.filter(
        (order) => order.fulfillment_status === null || order.fulfillment_status === 'unfulfilled'
      ).length

      setStatusCounts((prev) => ({
        ...prev,
        processing,
        awaitingFulfillment,
      }))
    } catch (error) {
      console.error('Error fetching store status:', error)
    }
  }

  useEffect(() => {
    fetchOrderStats()
  }, [])

  const statusList = [
    {
      icon: <BiTime className="text-yellow-500 text-xl" />,
      count: statusCounts.processing,
      label: 'orders',
      status: 'processing',
      textColor: 'text-primary-500',
    },
    {
      icon: <FaTruck className="text-red-500 text-xl" />,
      count: statusCounts.awaitingFulfillment,
      label: 'products',
      status: 'awaiting fulfillment',
      textColor: 'text-primary-500',
    },
    {
      icon: <BiDownArrow className="text-orange-500 text-xl" />,
      count: statusCounts.lowInStock,
      label: 'products',
      status: 'low in stock',
      textColor: 'text-primary-500',
    },
    {
      icon: <BiX className="text-red-500 text-xl" />,
      count: statusCounts.outOfStock,
      label: 'products',
      status: 'out of stock',
      textColor: 'text-primary-500',
    },
  ]

  return (
    <div className="w-full">
      <div className="bg-primary-500 text-white p-3 flex items-center gap-2 rounded-t-lg">
        <BiMenu className="text-lg" />
        <h2 className="text-lg">Store Stats</h2>
      </div>
      <div className="bg-white h-[372px] p-4 rounded-b-lg shadow-lg">
        <div className="space-y-4">
          {statusList.map((item, index) => (
            <div key={index} className="flex items-center gap-3 py-2 border-b last:border-b-0">
              {item.icon}
              <span className={item.textColor}>
                {item.count} {item.label}
              </span>
              <span className="text-gray-600">- {item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StoreStatus

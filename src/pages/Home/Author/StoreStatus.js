import React, { useEffect, useState } from 'react'
import { BiTime, BiMenu, BiDownArrow, BiX } from 'react-icons/bi'
import { FaTruck } from 'react-icons/fa'
import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance'
import { useLoading } from '../../../Context/LoadingContext'

const StoreStatus = () => {
  const [statusCounts, setStatusCounts] = useState({
    processing: 0,
    awaitingFulfillment: 0,
    lowInStock: 0,
    outOfStock: 0,
  })
  const { setLoading } = useLoading();
  const fetchStoreStatus = async () => {
    setLoading(true)
    try {
      // 1️⃣ Fetch orders
      const orderRes = await axiosAuthInstance.get('shopify/order')
      const orders = orderRes.data.orders || []

      // 2️⃣ Fetch products (for inventory)
      const productRes = await axiosAuthInstance.get('shopify/outOfStock')
      const products = productRes.data.products || []

      // 🟡 Count processing orders
      const processing = orders.length

      // 🔴 Orders awaiting fulfillment
      const awaitingFulfillment = orders.reduce((count, order) => {
        const unfulfilledItems = order.line_items?.filter(
          (item) =>
            item.fulfillment_status === null ||
            item.fulfillment_status === "unfulfilled"
        );

        return count + (unfulfilledItems?.length || 0);
      }, 0);

      // 🟠 Low stock: inventory_quantity <= 5 but > 0
      const lowInStock = products.filter((product) => {
        const qty = product.unitInStock ?? 0
        return qty <= 20
      }).length

      // 🔴 Out of stock: inventory_quantity == 0
      const outOfStock = products.filter((product) => {
        const qty = product.unitInStock ?? 0
        return qty === 0
      }).length

      // ✅ Update state
      setStatusCounts({
        processing,
        awaitingFulfillment,
        lowInStock,
        outOfStock,
      })
    } catch (error) {
      console.error('Error fetching store status:', error)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStoreStatus()
  }, [])

  const statusList = [
    {
      icon: <BiTime className='text-yellow-500 text-xl' />,
      count: statusCounts.processing,
      label: 'orders',
      status: 'processing',
      textColor: 'text-primary-500',
    },
    {
      icon: <FaTruck className='text-red-500 text-xl' />,
      count: statusCounts.awaitingFulfillment,
      label: 'products',
      status: 'awaiting fulfillment',
      textColor: 'text-primary-500',
    },
    {
      icon: <BiDownArrow className='text-orange-500 text-xl' />,
      count: statusCounts.lowInStock,
      label: 'products',
      status: 'low in stock',
      textColor: 'text-primary-500',
    },
    {
      icon: <BiX className='text-red-500 text-xl' />,
      count: statusCounts.outOfStock,
      label: 'products',
      status: 'out of stock',
      textColor: 'text-primary-500',
    },
  ]

  return (
    <div className='w-full'>
      {/* Author Payment Section */}
      {/* <div className=" p-4 rounded shadow flex flex-col md:flex-row justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Available for Withdrawal</p>
          <p className="text-xl font-bold">₹{ }</p>
          <p className="text-sm text-gray-400">Last Withdrawal: {"" ? new Date("").toLocaleDateString() : "N/A"}</p>
        </div>
        <button

          className={`mt-4 md:mt-0 px-4 py-2 rounded text-white  ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
        >
          Withdraw
        </button>
      </div> */}
      <div className='bg-primary-500 text-white p-3 flex items-center gap-2 rounded-t-lg'>
        <BiMenu className='text-lg' />
        <h2 className='text-lg'>Store Stats</h2>
      </div>
      <div className='bg-white h-[372px] p-4 rounded-b-lg shadow-lg'>
        <div className='space-y-4'>
          {statusList.map((item, index) => (
            <div
              key={index}
              className='flex items-center gap-3 py-2 border-b last:border-b-0'
            >
              {item.icon}
              <span className={item.textColor}>
                {item.count} {item.label}
              </span>
              <span className='text-gray-600'>- {item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StoreStatus

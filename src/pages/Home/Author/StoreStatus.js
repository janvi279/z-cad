import React from 'react'
import {
  BiTime,
  BiMenu,
  BiDownArrow,
  BiX
} from 'react-icons/bi'
import { FaTruck } from 'react-icons/fa'


const status = [
  {
    icon: <BiTime className="text-yellow-500 text-xl" />,
    count: 0,
    label: "orders",
    status: "processing",
    textColor: "text-primary-500"
  },
  {
    icon: <FaTruck className="text-red-500 text-xl" />,
    count: 0,
    label: "products",
    status: "awaiting fulfillment",
    textColor: "text-primary-500"
  },
  {
    icon: <BiDownArrow className="text-orange-500 text-xl" />,
    count: 0,
    label: "products",
    status: "low in stock",
    textColor: "text-primary-500"
  },
  {
    icon: <BiX className="text-red-500 text-xl" />,
    count: 0,
    label: "products",
    status: "out of stock",
    textColor: "text-primary-500"
  }
]

const StoreStatus = () => {
  return (
    <div className="w-full">
      <div className="bg-primary-500 text-white p-3 flex items-center gap-2 rounded-t-lg">
        <BiMenu className="text-lg" />
        <h2 className="text-lg">Store Stats</h2>
      </div>
      <div className="bg-white h-[372px] p-4 rounded-b-lg shadow-lg">
        <div className="space-y-4">
          {status.map((item, index) => (
            <div key={index} className="flex items-center gap-3 py-2 border-b last:border-b-0">
              {item.icon}
              <span className={item.textColor}>{item.count} {item.label}</span>
              <span className="text-gray-600">- {item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StoreStatus

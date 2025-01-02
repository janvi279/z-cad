'use client'

import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

// Chart configuration
const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
    y: {
      min: -1,
      max: 1,
      ticks: {
        stepSize: 0.2,
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
}

const SalesChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month')
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  // Generate dates for x-axis
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(2024, 11, 24 + i) // December 24-30, 2024
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  })

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Gross Sales',
        data: Array(7).fill(0),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Withdrawal',
        data: Array(7).fill(0),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Refunds',
        data: Array(7).fill(0),
        borderColor: 'rgb(244, 63, 94)',
        backgroundColor: 'rgba(244, 63, 94, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Order Counts',
        data: Array(7).fill(0),
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.5)',
        tension: 0.4,
      },
    ],
  }

  return (
    <div className='p-6 bg-white rounded-lg shadow-sm'>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div className='space-x-2'>
            <button
              className={`px-4 py-2 text-sm rounded-md ${
                selectedPeriod === 'year'
                  ? 'bg-sky-100 text-sky-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedPeriod('year')}
            >
              Year
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-md ${
                selectedPeriod === 'last-month'
                  ? 'bg-sky-100 text-sky-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedPeriod('last-month')}
            >
              Last Month
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-md ${
                selectedPeriod === 'this-month'
                  ? 'bg-sky-100 text-sky-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedPeriod('this-month')}
            >
              This Month
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-md ${
                selectedPeriod === 'last-7-days'
                  ? 'bg-sky-100 text-sky-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedPeriod('last-7-days')}
            >
              Last 7 Days
            </button>
            <div className='inline-block'>
              <DatePicker
                selected={startDate}
                onChange={(update) => setDateRange(update)}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                isClearable
                placeholderText='Choose Date Range'
                className='px-4 py-2 text-sm border rounded-md text-gray-600'
              />
            </div>
          </div>
          <button className='px-4 py-2 text-sm bg-gray-800 text-white rounded-md flex items-center gap-2'>
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
              />
            </svg>
            Print
          </button>
        </div>

        <div className='grid grid-cols-5 gap-4 text-center'>
          <div className='p-4 border rounded-lg'>
            <p className='text-lg font-medium'>₹0.00</p>
            <p className='text-sm text-gray-500'>gross sales in this period</p>
          </div>
          <div className='p-4 border rounded-lg'>
            <p className='text-lg font-medium'>₹0.00</p>
            <p className='text-sm text-gray-500'>total withdrawal</p>
          </div>
          <div className='p-4 border rounded-lg'>
            <p className='text-lg font-medium'>₹0.00</p>
            <p className='text-sm text-gray-500'>total refund</p>
          </div>
          <div className='p-4 border rounded-lg'>
            <p className='text-lg font-medium'>0</p>
            <p className='text-sm text-gray-500'>orders placed</p>
          </div>
          <div className='p-4 border rounded-lg'>
            <p className='text-lg font-medium'>0</p>
            <p className='text-sm text-gray-500'>items purchased</p>
          </div>
        </div>

        <div className='h-[400px]'>
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  )
}

export default SalesChart

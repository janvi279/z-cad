'use client'

import { useState, useEffect } from 'react'
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
import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
    tooltip: {
      callbacks: {
        label: (context) => `₹${context.raw.toFixed(2)}`,
      },
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(0,0,0,0.05)' },
    },
    y: {
      ticks: { beginAtZero: true },
      grid: { color: 'rgba(0,0,0,0.05)' },
    },
  },
}

const SalesChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month')
  const [dateRange, setDateRange] = useState([null, null])
  const [salesData, setSalesData] = useState({
    grossSales: 0,
    totalWithdrawal: 0,
    totalRefund: 0,
    ordersPlaced: 0,
    itemsPurchased: 0,
  })
  const [chartData, setChartData] = useState({ labels: [], datasets: [] })
  const [subtitle, setSubtitle] = useState('')

  const [startDate, endDate] = dateRange

  const fetchSalesData = async () => {
    try {
      const response = await axiosAuthInstance.get('shopify/salesByDate')
      if (response.status !== 200) throw new Error('API failed')

      const orders = response.data.orders
      const now = new Date()
      let fromDate, toDate

      if (selectedPeriod === 'this-month') {
        fromDate = new Date(now.getFullYear(), now.getMonth(), 1)
        toDate = now
      } else if (selectedPeriod === 'last-month') {
        fromDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        toDate = new Date(now.getFullYear(), now.getMonth(), 0)
      } else if (selectedPeriod === 'last-7-days') {
        fromDate = new Date(now)
        fromDate.setDate(now.getDate() - 6)
        toDate = now
      } else if (selectedPeriod === 'year') {
        fromDate = new Date(now.getFullYear(), 0, 1)
        toDate = now
      } else if (startDate && endDate) {
        fromDate = new Date(startDate)
        toDate = new Date(endDate)
      }

      // filter and process orders
      const grossByDate = {}
      let grossSales = 0, ordersPlaced = 0, itemsPurchased = 0

      orders.forEach((order) => {
        const orderDate = new Date(order.created_at)
        const value = parseFloat(order.total_price)
        if (isNaN(value)) return
        if (orderDate < fromDate || orderDate > toDate) return

        grossSales += value
        ordersPlaced += 1
        itemsPurchased += order.line_items.reduce((sum, item) => sum + item.quantity, 0)

        const key = orderDate.toISOString().split('T')[0]
        grossByDate[key] = (grossByDate[key] || 0) + value
      })

      // build dynamic label/value set
   const chartLabels = []
const chartValues = []

const isYear = selectedPeriod === 'year'
const isCustom = selectedPeriod === 'custom'
const dayDiff = fromDate && toDate ? Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) : 0
const useMonthly = isYear || (isCustom && dayDiff > 31)

if (useMonthly) {
  // --- Monthly Aggregation ---
  const monthlySales = {}

  // Initialize months based on range (current year for 'year', range months for 'custom')
  const monthsToPlot = []

  const from = new Date(fromDate)
  const to = new Date(toDate)

  // Push each month in range to monthsToPlot
  while (from <= to) {
    const label = from.toLocaleString('default', { month: 'short', year: 'numeric' })
    if (!monthsToPlot.includes(label)) monthsToPlot.push(label)
    from.setMonth(from.getMonth() + 1)
  }

  // Aggregate sales into months
  for (const date in grossByDate) {
    const d = new Date(date)
    const label = d.toLocaleString('default', { month: 'short', year: 'numeric' })
    monthlySales[label] = (monthlySales[label] || 0) + grossByDate[date]
  }

  // Final chart data
  for (const label of monthsToPlot) {
    chartLabels.push(label)
    chartValues.push(monthlySales[label] || 0)
  }
} else {
  // --- Daily Aggregation ---
  const pointer = new Date(fromDate)
  while (pointer <= toDate) {
    const key = pointer.toISOString().split('T')[0]
    chartLabels.push(pointer.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
    chartValues.push(grossByDate[key] || 0)
    pointer.setDate(pointer.getDate() + 1)
  }
}


      setSalesData({
        grossSales,
        totalWithdrawal: 0,
        totalRefund: 0,
        ordersPlaced,
        itemsPurchased,
      })

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: 'Sales',
            data: chartValues,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.3)',
            fill: true,
            tension: 0.4,
          },
        ],
      })

      const subtitleText = `${fromDate.toLocaleDateString()} to ${toDate.toLocaleDateString()}`
      setSubtitle(`₹${grossSales.toFixed(2)} in Sales — ${subtitleText}`)
    } catch (err) {
      console.error('Sales chart fetch failed:', err)
    }
  }

  useEffect(() => {
    fetchSalesData()
  }, [selectedPeriod, startDate, endDate])

  return (
    <div className='p-6 bg-white rounded-lg shadow-sm space-y-6'>
      {/* Filter Buttons */}
      <div className='flex items-center justify-between'>
        <div className='space-x-2 flex flex-wrap items-center'>
          {['year', 'last-month', 'this-month', 'last-7-days'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 text-sm rounded-md ${
                selectedPeriod === period
                  ? 'bg-sky-100 text-sky-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {period.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}

          <DatePicker
            selected={startDate}
            onChange={(update) => {
              setDateRange(update)
              setSelectedPeriod('custom')
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            isClearable
            placeholderText='Custom Range'
            className='px-4 py-2 text-sm border rounded-md text-gray-600'
          />
        </div>
        <button className='px-4 py-2 bg-gray-800 text-white rounded-md text-sm'>Print</button>
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-5 gap-3 text-center'>
        {[
          { label: 'Gross Sales', value: `₹${salesData.grossSales.toFixed(2)}` },
          { label: 'Total Withdrawal', value: `₹${salesData.totalWithdrawal.toFixed(2)}` },
          { label: 'Total Refund', value: `₹${salesData.totalRefund.toFixed(2)}` },
          { label: 'Orders Placed', value: salesData.ordersPlaced },
          { label: 'Items Purchased', value: salesData.itemsPurchased },
        ].map((card, i) => (
          <div key={i} className='p-3 border rounded-lg'>
            <p className='text-lg font-medium'>{card.value}</p>
            <p className='text-sm text-gray-500'>{card.label}</p>
          </div>
        ))}
      </div>

      {/* Chart Area */}
      <div className='space-y-2'>
        <p className='text-sm text-gray-500'>{subtitle}</p>
        <div className='h-[400px]'>
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  )
}

export default SalesChart

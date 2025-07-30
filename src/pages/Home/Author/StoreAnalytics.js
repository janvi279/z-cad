'use client'

import  { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { BsGraphUp } from 'react-icons/bs'
import { useLoading } from '../../../Context/LoadingContext'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js'
import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
)

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#E5E5E5',
      },
    },
    x: {
      grid: {
        color: '#E5E5E5',
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
}

const StoreAnalytics = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })
  const { setLoading } = useLoading();

  const fetchSalesData = async () => {
    setLoading(true)
    try {
      const response = await axiosAuthInstance.get('shopify/order')
      const refundResponse = await axiosAuthInstance.get("shopify/refund")
      const transactionResponse = await axiosAuthInstance.get("shopify/transactions")
      const orders = response.data.orders || []
      const refunds = refundResponse.data.refunds || []
      const transactions = transactionResponse.data.transactions || []

      const dailyMetrics = {}

      // Calculate total refunds
      refunds.forEach(refund => {
        const dateKey = new Date(refund.createdAtShopify).toISOString().split('T')[0]
        const refundAmount = parseFloat(refund.amount || 0)

        if (!dailyMetrics[dateKey]) {
          dailyMetrics[dateKey] = {
            grossSales: 0,
            totalRefund: 0,
            totalWithdrawal: 0,
            ordersPlaced: 0,
            itemsPurchased: 0,
          }
        }
        dailyMetrics[dateKey].totalRefund += refundAmount
      })

      // Calculate total withdrawals
      transactions.forEach(t => {
        const dateKey = new Date(t.date).toISOString().split('T')[0]
        const withdrawalAmount = parseFloat(t.amount || 0)

        if (!dailyMetrics[dateKey]) {
          dailyMetrics[dateKey] = {
            grossSales: 0,
            totalRefund: 0,
            totalWithdrawal: 0,
            ordersPlaced: 0,
            itemsPurchased: 0,
          }
        }
        dailyMetrics[dateKey].totalWithdrawal += withdrawalAmount
      })

      // Calculate sales data from orders
      orders.forEach(order => {
        const dateKey = new Date(order.orderCreate).toISOString().split('T')[0]
        const grossSales = parseFloat(order.TotalPrice) || 0
        const orderPlaced = 1
        const itemsPurchased = order.itemsSold

        if (!dailyMetrics[dateKey]) {
          dailyMetrics[dateKey] = {
            grossSales: 0,
            totalRefund: 0,
            totalWithdrawal: 0,
            ordersPlaced: 0,
            itemsPurchased: 0,
          }
        }

        dailyMetrics[dateKey].grossSales += grossSales
        dailyMetrics[dateKey].ordersPlaced += orderPlaced
        dailyMetrics[dateKey].itemsPurchased += itemsPurchased
      })

      // Generate past 30 days even if no data exists
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 29)
      const endDate = new Date()
      const fullDates = []
      const pointer = new Date(startDate)

      while (pointer <= endDate) {
        const key = pointer.toISOString().split('T')[0]
        fullDates.push(key)
        if (!dailyMetrics[key]) {
          dailyMetrics[key] = {
            grossSales: 0,
            totalRefund: 0,
            totalWithdrawal: 0,
            ordersPlaced: 0,
            itemsPurchased: 0,
          }
        }
        pointer.setDate(pointer.getDate() + 1)
      }

      const labels = fullDates.map((dateStr) =>
        new Date(dateStr).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
      )

      const grossSalesData = fullDates.map((d) => dailyMetrics[d].grossSales)
      const refundData = fullDates.map((d) => dailyMetrics[d].totalRefund)
      const withdrawalData = fullDates.map((d) => dailyMetrics[d].totalWithdrawal)
      const ordersData = fullDates.map((d) => dailyMetrics[d].ordersPlaced)
      const itemsData = fullDates.map((d) => dailyMetrics[d].itemsPurchased)

      setChartData({
        labels,
        datasets: [
          {
            label: 'Gross Sales',
            data: grossSalesData,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Total Refund',
            data: refundData,
            borderColor: '#EF4444',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Total Withdrawal',
            data: withdrawalData,
            borderColor: '#F59E0B',
            backgroundColor: 'rgba(245, 158, 11, 0.2)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Orders Placed',
            data: ordersData,
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Items Purchased',
            data: itemsData,
            borderColor: '#8B5CF6',
            backgroundColor: 'rgba(139, 92, 246, 0.2)',
            tension: 0.4,
            fill: true,
          },
        ],
      })
    } catch (err) {
      console.error('Failed to fetch sales data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSalesData()
  }, [])

  return (
    <div className="w-full">
      <div className="bg-primary-500 text-white p-3 flex items-center gap-2 rounded-t-lg">
        <BsGraphUp className="text-lg" />
        <h2 className="text-lg">Store Analytics</h2>
      </div>
      <div className="bg-white p-4 h-[372px] rounded-b-lg shadow-lg">
        {chartData.labels.length === 0 ? (
          <p className="text-center text-gray-500 mt-16">No data available for this period.</p>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>
    </div>
  )
}

export default StoreAnalytics

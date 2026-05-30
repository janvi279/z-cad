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
  Filler,
} from 'chart.js'
import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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
    const response =
      await axiosAuthInstance.get(
        'shopify/order',
      )

    const refundResponse =
      await axiosAuthInstance.get(
        'shopify/refund',
      )

    const transactionResponse =
      await axiosAuthInstance.get(
        'shopify/transactions',
      )

    const orders =
      response?.data?.orders || []

    const refunds =
      refundResponse?.data?.refunds || []

  const transactions =
  Array.isArray(
    transactionResponse?.data
  )
    ? transactionResponse.data
    : Array.isArray(
        transactionResponse?.data
          ?.transactions
      )
    ? transactionResponse.data
        .transactions
    : []
    const dailyMetrics = {}

    // ==========================
    // ORDERS
    // ==========================

    orders.forEach((order) => {
      const dateKey =
        new Date(
          order.orderCreate,
        )
          .toISOString()
          .split('T')[0]

      if (!dailyMetrics[dateKey]) {
        dailyMetrics[dateKey] = {
          grossSales: 0,
          totalRefund: 0,
          totalWithdrawal: 0,
          ordersPlaced: 0,
          itemsPurchased: 0,
        }
      }

      dailyMetrics[
        dateKey
      ].grossSales +=
        parseFloat(
          order.TotalPrice || 0,
        )

      dailyMetrics[
        dateKey
      ].ordersPlaced += 1

      dailyMetrics[
        dateKey
      ].itemsPurchased +=
        Number(
          order.itemsSold || 0,
        )
    })

    // ==========================
    // REFUNDS
    // ==========================

    refunds.forEach((refund) => {
      const dateKey =
        new Date(
          refund.createdAtShopify,
        )
          .toISOString()
          .split('T')[0]

      if (!dailyMetrics[dateKey]) {
        dailyMetrics[dateKey] = {
          grossSales: 0,
          totalRefund: 0,
          totalWithdrawal: 0,
          ordersPlaced: 0,
          itemsPurchased: 0,
        }
      }

      const refundAmount =
        Math.abs(
          parseFloat(
            refund
              ?.transactions?.[0]
              ?.amount || 0,
          ),
        )

      dailyMetrics[
        dateKey
      ].totalRefund +=
        refundAmount
    })

    // ==========================
    // TRANSACTIONS
    // ==========================

    transactions.forEach((t) => {
      const dateKey =
        new Date(
          t.processed_at ||
            t.created_at,
        )
          .toISOString()
          .split('T')[0]

      if (!dailyMetrics[dateKey]) {
        dailyMetrics[dateKey] = {
          grossSales: 0,
          totalRefund: 0,
          totalWithdrawal: 0,
          ordersPlaced: 0,
          itemsPurchased: 0,
        }
      }

      const amount =
        Math.abs(
          parseFloat(
            t.amount || 0,
          ),
        )

      dailyMetrics[
        dateKey
      ].totalWithdrawal +=
        amount
    })

    // ==========================
    // LAST 30 DAYS
    // ==========================

    const startDate =
      new Date()

    startDate.setDate(
      startDate.getDate() -
        29,
    )

    const endDate =
      new Date()

    const fullDates = []

    const pointer =
      new Date(startDate)

    while (pointer <= endDate) {
      const key =
        pointer
          .toISOString()
          .split('T')[0]

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

      pointer.setDate(
        pointer.getDate() + 1,
      )
    }

    const labels =
      fullDates.map((d) =>
        new Date(
          d,
        ).toLocaleDateString(
          'en-US',
          {
            month: 'short',
            day: 'numeric',
          },
        ),
      )

    setChartData({
      labels,

      datasets: [
        {
          label:
            'Gross Sales',

          data: fullDates.map(
            (d) =>
              dailyMetrics[d]
                .grossSales,
          ),

          borderColor:
            '#3B82F6',

          backgroundColor:
            'rgba(59,130,246,.2)',

          tension: 0.4,
        },

        {
          label:
            'Refund',

          data: fullDates.map(
            (d) =>
              dailyMetrics[d]
                .totalRefund,
          ),

          borderColor:
            '#EF4444',

          backgroundColor:
            'rgba(239,68,68,.2)',

          tension: 0.4,
        },

        {
          label:
            'Withdrawal',

          data: fullDates.map(
            (d) =>
              dailyMetrics[d]
                .totalWithdrawal,
          ),

          borderColor:
            '#F59E0B',

          backgroundColor:
            'rgba(245,158,11,.2)',

          tension: 0.4,
        },

        {
          label:
            'Orders',

          data: fullDates.map(
            (d) =>
              dailyMetrics[d]
                .ordersPlaced,
          ),

          borderColor:
            '#10B981',

          backgroundColor:
            'rgba(16,185,129,.2)',

          tension: 0.4,
        },

        {
          label:
            'Items Sold',

          data: fullDates.map(
            (d) =>
              dailyMetrics[d]
                .itemsPurchased,
          ),

          borderColor:
            '#8B5CF6',

          backgroundColor:
            'rgba(139,92,246,.2)',

          tension: 0.4,
        },
      ],
    })
  } catch (err) {
    console.error(err)
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

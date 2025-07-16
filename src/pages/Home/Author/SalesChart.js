'use client'

import React, { useState, useEffect } from 'react'
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
      min: 0,
      ticks: {
        stepSize: 1000,
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
  const [salesData, setSalesData] = useState({
    grossSales: 0,
    totalWithdrawal: 0,
    totalRefund: 0,
    ordersPlaced: 0,
    itemsPurchased: 0,
  })
  console.log("🚀 ~ SalesChart ~ salesData:", salesData)
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  const [startDate, endDate] = dateRange

  // Fetch sales data from the API
  const fetchSalesData = async () => {
    try {
      const response = await axiosAuthInstance.get('shopify/salesByDate');
      console.log("API Response:", response.data);

      if (response.status !== 200) throw new Error('Network response not ok');

      const orders = response.data.orders;
      const currentDate = new Date(); // ✅ Use actual current date
      let grossSales = 0;
      let ordersPlaced = 0;
      let itemsPurchased = 0;
      const dailySales = {};

      // Loop over all orders
      orders.forEach((order) => {
        const orderDate = new Date(order.created_at);
        const orderValue = parseFloat(order.total_price);
        if (isNaN(orderValue)) return;

        let isInPeriod = false;

        // Match based on selectedPeriod
        if (selectedPeriod === 'this-month') {
          isInPeriod =
            orderDate.getMonth() === currentDate.getMonth() &&
            orderDate.getFullYear() === currentDate.getFullYear();
        } else if (selectedPeriod === 'last-month') {
          const lastMonthDate = new Date(currentDate);
          lastMonthDate.setMonth(currentDate.getMonth() - 1);
          isInPeriod =
            orderDate.getMonth() === lastMonthDate.getMonth() &&
            orderDate.getFullYear() === lastMonthDate.getFullYear();
        } else if (selectedPeriod === 'last-7-days') {
          const sevenDaysAgo = new Date(currentDate);
          sevenDaysAgo.setDate(currentDate.getDate() - 6); // includes today
          isInPeriod = orderDate >= sevenDaysAgo && orderDate <= currentDate;
        } else if (selectedPeriod === 'year') {
          isInPeriod = orderDate.getFullYear() === currentDate.getFullYear();
        }

        if (isInPeriod) {
          grossSales += orderValue;
          ordersPlaced += 1;
          itemsPurchased += order.line_items.reduce((sum, item) => sum + item.quantity, 0);

          const dayKey = orderDate.toISOString().split('T')[0];
          dailySales[dayKey] = (dailySales[dayKey] || 0) + orderValue;
        }
      });

      // Generate chart data - last 7 days
      const chartLabels = [];
      const chartValues = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);
        const dateKey = date.toISOString().split('T')[0];

        chartLabels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        chartValues.push(dailySales[dateKey] || 0);
      }

      setSalesData({
        grossSales,
        totalWithdrawal: 0, // Update if needed
        totalRefund: 0,     // Update if needed
        ordersPlaced,
        itemsPurchased,
      });

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: 'Daily Sales',
            data: chartValues,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            tension: 0.4,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };




  useEffect(() => {
    fetchSalesData();
  }, [selectedPeriod]);

  return (
    <div className='p-6 bg-white rounded-lg shadow-sm'>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div className='space-x-2'>
            <button
              className={`px-4 py-2 text-sm rounded-md ${selectedPeriod === 'year'
                ? 'bg-sky-100 text-sky-600'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
              onClick={() => setSelectedPeriod('year')}
            >
              Year
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-md ${selectedPeriod === 'last-month'
                ? 'bg-sky-100 text-sky-600'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
              onClick={() => setSelectedPeriod('last-month')}
            >
              Last Month
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-md ${selectedPeriod === 'this-month'
                ? 'bg-sky-100 text-sky-600'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
              onClick={() => setSelectedPeriod('this-month')}
            >
              This Month
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-md ${selectedPeriod === 'last-7-days'
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

        <div className='grid grid-cols-5 gap-3 text-center'>
          <div className='p-3 border rounded-lg'>
            <p className='text-lg font-medium'>₹{salesData.grossSales.toFixed(2)}</p>
            <p className='text-sm text-gray-500'>gross sales in this period</p>
          </div>
          <div className='p-3 border rounded-lg'>
            <p className='text-lg font-medium'>₹{salesData.totalWithdrawal.toFixed(2)}</p>
            <p className='text-sm text-gray-500'>total withdrawal</p>
          </div>
          <div className='p-3 border rounded-lg'>
            <p className='text-lg font-medium'>₹{salesData.totalRefund.toFixed(2)}</p>
            <p className='text-sm text-gray-500'>total refund</p>
          </div>
          <div className='p-3 border rounded-lg'>
            <p className='text-lg font-medium'>{salesData.ordersPlaced}</p>
            <p className='text-sm text-gray-500'>orders placed</p>
          </div>
          <div className='p-3 border rounded-lg'>
            <p className='text-lg font-medium'>{salesData.itemsPurchased}</p>
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
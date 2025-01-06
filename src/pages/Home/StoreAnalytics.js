import React from 'react'
import { Line } from 'react-chartjs-2'
import { BsGraphUp } from 'react-icons/bs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js'

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
      beginAtZero: false,
      min: -1.0,
      max: 1.0,
      ticks: {
        stepSize: 0.2,
      },
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
      display: false,
    },
  },
}

const data = {
  labels: [
    'Dec 25, 24',
    'Dec 26, 24',
    'Dec 27, 24',
    'Dec 28, 24',
    'Dec 29, 24',
    'Dec 30, 24',
    'Dec 31, 24',
  ],
  datasets: [
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      borderColor: '#FFD700', // Yellow color
      backgroundColor: '#FFD700',
      tension: 0.1,
      pointRadius: 3,
    },
  ],
}

const StoreAnalytics = () => {
  return (
    <div className="w-full">
      <div className="bg-primary-500 text-white p-3 flex items-center gap-2 rounded-t-lg">
        <BsGraphUp className="text-lg" />
        <h2 className="text-lg">Store Analytics</h2>
      </div>
      <div className="bg-white p-4 h-[372px] rounded-b-lg shadow-lg">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export default StoreAnalytics

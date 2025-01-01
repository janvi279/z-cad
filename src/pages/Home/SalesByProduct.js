import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { BiDollar } from 'react-icons/bi'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, 
    },
    tooltip: {
      enabled: false, 
    },
  },
  cutout: '5%', 
}

const data = {
  labels: ['No Sales Yet'], 
  datasets: [
    {
      data: [10], 
      backgroundColor: ['rgb(45, 187, 199)'], 
      borderWidth: 0, 
    },
  ],
}

const SalesByProduct = () => {
  return (
    <div className="w-full">
      <div className="bg-primary-700 text-white p-3 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center gap-2">
          <BiDollar className="text-lg" />
          <h2 className="text-lg">Sales by Product</h2>
        </div>
      </div>

      <div className="bg-white p-4 rounded-b-lg shadow-lg">
        <div className="h-[300px] relative">
          <Doughnut data={data} options={options} />
        </div>
        <div className="mt-4 flex items-center gap-2 justify-center">
          <div className="w-4 h-4 bg-[rgb(45,187,199)]"></div>
          <span className="text-gray-600">No sales yet...!!!</span>
        </div>
      </div>
    </div>
  )
}

export default SalesByProduct

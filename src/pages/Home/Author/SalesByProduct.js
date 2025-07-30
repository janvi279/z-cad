import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { BiDollar } from 'react-icons/bi'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance'
import { useLoading } from '../../../Context/LoadingContext'

ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'right',
      labels: {
        boxWidth: 12,
        padding: 15,
        font: {
          size: 12,
          family: 'Inter, sans-serif',
        },
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.label || ''
          const value = context.raw || 0
          return `${label}: ₹${value.toFixed(2)}`
        },
      },
    },
  },
  cutout: '50%',
}

const SalesByProduct = () => {
  const [chartData, setChartData] = useState({
    labels: ['No Sales Yet'],
    datasets: [
      {
        data: [10],
        backgroundColor: ['rgb(45, 187, 199)'],
        borderWidth: 0,
      },
    ],
  });
  const { setLoading } = useLoading();

  const fetchSalesData = async () => {
    setLoading(true);
    try {
      const response = await axiosAuthInstance.get('shopify/order');
      const orders = response.data.orders || [];

      const productSales = {};

      // Calculate total sales for each product from the orders
      orders.forEach((order) => {
        order.products.forEach((item) => {
          const productName = item.productName;
          const productPrice = item.productPrice;
          const quantity = item.quantity;
          if (!productSales[productName]) {
            productSales[productName] = 0;
          }
          productSales[productName] += productPrice * quantity;
        });
      });

      const labels = Object.keys(productSales);
      const data = Object.values(productSales);
      const colors = [
        'rgb(45, 187, 199)',
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
      ];

      if (labels.length > 0) {
        setChartData({
          labels,
          datasets: [
            {
              data,
              backgroundColor: labels.map((_, i) => colors[i % colors.length]),
              borderWidth: 0,
            },
          ],
        });
      } else {
        // Handle case with no sales
        setChartData({
          labels: ['No Sales Yet'],
          datasets: [
            {
              data: [10],
              backgroundColor: ['rgb(45, 187, 199)'],
              borderWidth: 0,
            },
          ],
        });
      }
    } catch (err) {
      console.error('Failed to fetch sales data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <div className="w-full">
      <div className="bg-primary-500 text-white p-3 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center gap-2">
          <BiDollar className="text-lg" />
          <h2 className="text-lg">Sales by Product</h2>
        </div>
      </div>

      <div className="bg-white pr-2 p-4 rounded-b-lg shadow-lg">
        <div className="h-[340px] relative">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>
    </div>
  )
}

export default SalesByProduct;

import React, { useEffect, useState } from 'react'

import { getDistributorDashboard } from '../../services/distributorApi'

function DistributorDashboard() {
  const [data, setData] = useState({})

  const fetchDashboard = async () => {
    try {
      const res = await getDistributorDashboard()

      setData(res.data.cards)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  return (
    <div>
      <h2>Distributor Dashboard</h2>

      <div className='row'>
        <div className='col-md-3'>
          <div className='card p-3'>
            <h5>Total Products</h5>

            <h3>{data.totalProducts || 0}</h3>
          </div>
        </div>

        <div className='col-md-3'>
          <div className='card p-3'>
            <h5>Total Orders</h5>

            <h3>{data.totalOrders || 0}</h3>
          </div>
        </div>

        <div className='col-md-3'>
          <div className='card p-3'>
            <h5>Revenue</h5>

            <h3>₹{data.totalRevenue || 0}</h3>
          </div>
        </div>

        <div className='col-md-3'>
          <div className='card p-3'>
            <h5>Commission</h5>

            <h3>₹{data.totalCommission || 0}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DistributorDashboard

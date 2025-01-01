import React, { useEffect, useState } from 'react'
import WelcomeBox from './WelcomeBox'
import SalesChart from './SalesChart'
import StoreAnalytics from './StoreAnalytics'
import SalesByProduct from './SalesByProduct'
import Notifications from './Notifications'
import LatestTopic from './LatestTopic'
import StoreStatus from './StoreStatus'

const Home = () => {
  return (
    <>
      <WelcomeBox />
      <SalesChart />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <StoreAnalytics />
        <SalesByProduct />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <Notifications />
        <LatestTopic />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <StoreStatus />
      </div>
    </>
  )
}

export default Home

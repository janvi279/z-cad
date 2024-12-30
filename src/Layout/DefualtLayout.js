import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../Components/Header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className='relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-gray-500/5'>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className='mx-auto max-w-screen-2xl p-4'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DefaultLayout

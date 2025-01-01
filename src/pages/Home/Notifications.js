import React from 'react'
import { BiBell } from 'react-icons/bi'

const Notifications = () => {
  return (
    <div className='w-full'>
      <div className='bg-primary-700 text-white p-3 flex items-center gap-2 rounded-t-lg'>
        <BiBell className='text-lg' />
        <h2 className='text-lg'>Notifications </h2>
      </div>
      <div className="bg-white p-4 h-[372px] rounded-b-lg shadow-lg">
             <p className='text-lg'>There is no notification yet!!</p>
      </div>
    </div>
  )
}

export default Notifications

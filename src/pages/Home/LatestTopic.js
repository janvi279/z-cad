import React from 'react'
import { HiOutlineSpeakerphone } from "react-icons/hi";

const LatestTopic = () => {
  return (
    <div className='w-full'>
      <div className='bg-primary-500 text-white p-3 flex items-center gap-2 rounded-t-lg'>
        <HiOutlineSpeakerphone className='text-lg' />
        <h2 className='text-lg'>Latest Topics </h2>
      </div>
      <div className="bg-white p-4 h-[372px] rounded-b-lg shadow-lg">
        <p className='text-lg'>There is no topic yet!!</p>
      </div>
    </div>
  )
}

export default LatestTopic

import React from 'react'
import logo from '../../../src/ZCADICON.png' // or wherever your logo is stored

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white/70 z-[9999] flex flex-col justify-center items-center space-y-4">
      <img src={logo} alt="Logo" className="w-16 h-16 object-contain animate-pulse" />
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-blue-700 font-semibold">Loading...</p>
    </div>
  )
}

export default FullPageLoader

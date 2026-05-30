import React, { useEffect, useState } from 'react'

import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'

const Wallet = () => {
  const [wallet, setWallet] = useState(null)

  const [amount, setAmount] = useState('')

  // FETCH
  const fetchWallet = async () => {
    try {
      const response = await axiosAuthInstance.get('/wallet')

      if (response.data.success) {
        setWallet(response.data.wallet)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // WITHDRAW
  const handleWithdraw = async () => {
    try {
      const response = await axiosAuthInstance.post('/wallet/withdraw', {
        amount,
      })

      alert(response.data?.message)

      fetchWallet()
    } catch (error) {
      alert(error.response?.message)
    }
  }

  useEffect(() => {
    fetchWallet()
  }, [])

  return (
    <div className='p-5'>
      <h1 className='text-2xl font-bold mb-5'>Wallet</h1>

      {/* CARDS */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='bg-green-100 p-5 rounded-xl'>
          <p>Available Balance</p>

          <h2 className='text-3xl font-bold mt-2'>
            ₹{wallet?.availableBalance}
          </h2>
        </div>

        <div className='bg-yellow-100 p-5 rounded-xl'>
          <p>Pending Withdrawal</p>

          <h2 className='text-3xl font-bold mt-2'>
            ₹{wallet?.pendingWithdrawal}
          </h2>
        </div>

        <div className='bg-blue-100 p-5 rounded-xl'>
          <p>Total Withdrawn</p>

          <h2 className='text-3xl font-bold mt-2'>₹{wallet?.totalWithdrawn}</h2>
        </div>
      </div>

      {/* REQUEST */}
      <div className='bg-white p-5 rounded-xl mt-6 shadow'>
        <h2 className='text-xl font-bold mb-4'>Request Withdrawal</h2>

        <input
          type='number'
          placeholder='Enter Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className='border p-3 rounded-lg w-full'
        />

        <button
          onClick={handleWithdraw}
          className='mt-4 bg-primary-500 text-white px-5 py-2 rounded-lg'
        >
          Request Withdrawal
        </button>
      </div>
    </div>
  )
}

export default Wallet

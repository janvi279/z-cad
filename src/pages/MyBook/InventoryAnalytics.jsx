import React, {
  useEffect,
  useState,
} from 'react'

import {
  useParams,
} from 'react-router-dom'

import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'

const InventoryAnalytics = () => {
  const { id } = useParams()

  const [book, setBook] =
    useState(null)

  const [analytics, setAnalytics] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  // =========================================
  // FETCH ANALYTICS
  // =========================================

  const fetchBookAnalytics =
    async () => {
      try {
        setLoading(true)

        const response =
          await axiosAuthInstance.get(
            `/book/analytics/${id}`,
          )

        if (
          response.data.success
        ) {
          setBook(
            response.data.book,
          )

          setAnalytics(
            response.data.analytics,
          )
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

  // =========================================
  // USE EFFECT
  // =========================================

  useEffect(() => {
    fetchBookAnalytics()
  }, [])

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className='bg-white rounded-2xl shadow p-5 mt-6'>
        <h2 className='text-xl font-bold text-gray-800'>
          Loading Analytics...
        </h2>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-2xl shadow p-5 mt-6'>
      {/* =====================================
          HEADER
      ===================================== */}

      <div className='flex items-center justify-between mb-5'>
        <div>
          <h2 className='text-xl font-bold text-gray-800'>
            Inventory Analytics
          </h2>

          <p className='text-sm text-gray-500 mt-1'>
            Book sales, stock,
            and publishing
            inventory details
          </p>
        </div>

        {/* Status */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            book?.status ===
            'Published'
              ? 'bg-green-100 text-green-600'
              : 'bg-yellow-100 text-yellow-600'
          }`}
        >
          {book?.status ||
            'Pending'}
        </span>
      </div>

      {/* =====================================
          ANALYTICS CARDS
      ===================================== */}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* Total Copies */}
        <div className='bg-blue-50 rounded-2xl p-5 border border-blue-100'>
          <p className='text-sm text-gray-500'>
            Total Printed Copies
          </p>

          <h3 className='text-3xl font-bold text-blue-600 mt-3'>
            {book?.totalCopies ||
              0}
          </h3>
        </div>

        {/* Gift Copies */}
        <div className='bg-yellow-50 rounded-2xl p-5 border border-yellow-100'>
          <p className='text-sm text-gray-500'>
            Gift Copies
          </p>

          <h3 className='text-3xl font-bold text-yellow-600 mt-3'>
            {book?.giftCopies ||
              0}
          </h3>
        </div>

        {/* Sold Copies */}
        <div className='bg-green-50 rounded-2xl p-5 border border-green-100'>
          <p className='text-sm text-gray-500'>
            Sold Copies
          </p>

          <h3 className='text-3xl font-bold text-green-600 mt-3'>
            {analytics?.soldCopies ||
              0}
          </h3>
        </div>

        {/* Stock Left */}
        <div className='bg-purple-50 rounded-2xl p-5 border border-purple-100'>
          <p className='text-sm text-gray-500'>
            Available Stock
          </p>

          <h3 className='text-3xl font-bold text-purple-600 mt-3'>
            {analytics?.stockLeft ||
              0}
          </h3>
        </div>
      </div>

      {/* =====================================
          REVENUE SECTION
      ===================================== */}

      <div className='mt-6 bg-primary-50 border border-primary-100 rounded-2xl p-6'>
        <p className='text-sm text-gray-500'>
          Total Revenue
        </p>

        <h2 className='text-4xl font-bold text-primary-600 mt-3'>
          ₹{' '}
          {analytics?.revenue?.toLocaleString() ||
            0}
        </h2>

        <p className='text-sm text-gray-500 mt-2'>
          Revenue generated from
          sold book copies.
        </p>
      </div>

      {/* =====================================
          EXTRA DETAILS
      ===================================== */}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-6'>
        {/* SKU */}
        <div className='border rounded-2xl p-5'>
          <p className='text-sm text-gray-500'>
            Linked Product SKU
          </p>

          <h3 className='text-lg font-semibold text-gray-800 mt-2'>
            {book?.sku || '--'}
          </h3>
        </div>

        {/* Publishing Stage */}
        <div className='border rounded-2xl p-5'>
          <p className='text-sm text-gray-500'>
            Current Publishing
            Stage
          </p>

          <h3 className='text-lg font-semibold text-gray-800 mt-2'>
            {book?.currentStage ||
              'Pending'}
          </h3>
        </div>
      </div>

      {/* =====================================
          INVENTORY SUMMARY
      ===================================== */}

      <div className='mt-6 bg-gray-50 rounded-2xl p-5 border'>
        <h3 className='text-lg font-semibold text-gray-800 mb-3'>
          Inventory Summary
        </h3>

        <div className='space-y-2 text-sm text-gray-600'>
          <p>
            • Total printed
            copies:{' '}
            <strong>
              {book?.totalCopies ||
                0}
            </strong>
          </p>

          <p>
            • Complimentary /
            gift copies:{' '}
            <strong>
              {book?.giftCopies ||
                0}
            </strong>
          </p>

          <p>
            • Successfully sold
            copies:{' '}
            <strong>
              {analytics?.soldCopies ||
                0}
            </strong>
          </p>

          <p>
            • Remaining stock
            available:{' '}
            <strong>
              {analytics?.stockLeft ||
                0}
            </strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default InventoryAnalytics
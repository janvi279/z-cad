import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance'

import WelcomeBox from './WelcomeBox'
import SalesChart from './SalesChart'
import StoreAnalytics from './StoreAnalytics'
import SalesByProduct from './SalesByProduct'
import StoreStatus from './StoreStatus'
import OutOfTheStock from './OutOfTheStock'

import { useLoading } from '../../../Context/LoadingContext'

const Home = () => {
  const [activeButton, setActiveButton] =
    useState('salesByDate')

  const [hasProduct, setHasProduct] =
    useState(true)

  const [birthdayData, setBirthdayData] =
    useState(null)

  const { setLoading } =
    useLoading()

  const navigate = useNavigate()

  // =====================================
  // BUTTON CHANGE
  // =====================================

  const handleButtonClick = (
    button,
  ) => {
    setActiveButton(button)
  }

  // =====================================
  // CHECK PRODUCT
  // =====================================

  useEffect(() => {
    setLoading(true)

    const checkAuthorProduct =
      async () => {
        try {
          const { data } =
            await axiosAuthInstance.get(
              'author/has-products',
            )

          setHasProduct(
            data?.hasProduct,
          )
        } catch (error) {
          console.error(
            'Failed to check author products:',
            error,
          )

          setHasProduct(false)
        } finally {
          setLoading(false)
        }
      }

    checkAuthorProduct()
  }, [])

  // =====================================
  // BIRTHDAY CHECK
  // =====================================

  useEffect(() => {
    const fetchBirthday =
      async () => {
        try {
          const response =
            await axiosAuthInstance.get(
              'personal-detail',
            )

          if (
            response &&
            response.status === 200
          ) {
            const user =
              response.data.result

            if (!user?.dob)
              return

            const today =
              new Date()

            const dob =
              new Date(user.dob)

            const todayMonth =
              today.getMonth()

            const todayDate =
              today.getDate()

            const dobMonth =
              dob.getMonth()

            const dobDate =
              dob.getDate()

            // MATCH BIRTHDAY
            if (
              todayMonth ===
                dobMonth &&
              todayDate === dobDate
            ) {
              setBirthdayData(
                user,
              )
            }
          }
        } catch (error) {
          console.log(error)
        }
      }

    fetchBirthday()
  }, [])

  // =====================================
  // NO PRODUCT
  // =====================================

  if (!hasProduct) {
    return (
      <div className='text-center py-20'>
        <h2 className='text-xl font-bold'>
          👋 Welcome, Author!
        </h2>

        <p className='text-gray-600 mt-3 max-w-xl mx-auto'>
          To start tracking
          book sales, orders,
          payments, and
          analytics, please
          link your published
          store book using the
          book SKU.
        </p>

        <button
          className='mt-5 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition'
          onClick={() =>
            navigate(
              '/products',
            )
          }
        >
          Link Published Book
        </button>
      </div>
    )
  }

  return (
    <>
      {/* =====================================
          BIRTHDAY CARD
      ===================================== */}

      {birthdayData && (
        <div className='bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl p-6 text-white shadow-lg mb-6 relative overflow-hidden'>
          
          {/* Decorative */}
          <div className='absolute top-0 right-0 opacity-10 text-[120px] font-bold'>
            🎉
          </div>

          <div className='relative z-10'>
            <h2 className='text-3xl font-bold'>
              Happy Birthday
              🎂
            </h2>

            <h3 className='text-xl mt-2 font-semibold'>
              {
                birthdayData.firstName
              }{' '}
              {
                birthdayData.lastName
              }
            </h3>

            <p className='mt-4 text-sm md:text-base max-w-2xl leading-7'>
              Wishing you
              creativity,
              happiness,
              success, and many
              more best-selling
              books ahead.
              <br />
              Thank you for
              being part of ZCAD
              Publication.
            </p>

            <button className='mt-5 bg-white text-purple-600 font-semibold px-5 py-2 rounded-lg hover:bg-gray-100 transition'>
              🎉 Celebrate Your
              Special Day
            </button>
          </div>
        </div>
      )}

      {/* =====================================
          TOP FILTER BUTTONS
      ===================================== */}

      <div className='w-full bg-white p-4 flex gap-5 rounded-xl shadow-sm'>
        {/* SALES */}
        <div
          className={`border p-2 rounded-lg text-sm text-gray-600 hover:bg-primary-100 cursor-pointer ${
            activeButton ===
            'salesByDate'
              ? 'bg-primary-100 text-primary-600 border-primary-300'
              : 'hover:text-primary-600'
          }`}
          onClick={() =>
            handleButtonClick(
              'salesByDate',
            )
          }
        >
          <button>
            Sales By Date
          </button>
        </div>

        {/* STOCK */}
        <div
          className={`border p-2 rounded-lg text-sm text-gray-600 hover:bg-primary-100 cursor-pointer ${
            activeButton ===
            'outOfStock'
              ? 'bg-primary-100 text-primary-600 border-primary-300'
              : 'hover:text-primary-600'
          }`}
          onClick={() =>
            handleButtonClick(
              'outOfStock',
            )
          }
        >
          <button>
            Out Of Stock
          </button>
        </div>
      </div>

      {/* =====================================
          CONTENT
      ===================================== */}

      {activeButton ===
      'outOfStock' ? (
        <OutOfTheStock />
      ) : (
        <>
          <WelcomeBox />

          <SalesChart />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10'>
            <StoreAnalytics />

            <SalesByProduct />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10'>
            <StoreStatus />
          </div>
        </>
      )}
    </>
  )
}

export default Home
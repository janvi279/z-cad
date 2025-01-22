import { Link } from 'react-router-dom'
import { RiMenu2Fill } from 'react-icons/ri'
import { BiBell } from 'react-icons/bi'
import { HiOutlineSpeakerphone } from 'react-icons/hi'
import { FaBook } from 'react-icons/fa'
import { CiUser } from 'react-icons/ci'
import { useEffect, useContext, useRef, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'

const Header = (props) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchRef = useRef(null)

  const { profileData } = useContext(AuthContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className='sticky top-0 z-[999] w-full h-[67px] flex bg-[#FFFFFF] drop-shadow-1 border-b border-light-gray'>
      <div className='h-[67px] flex flex-grow items-center lg:justify-end justify-between shadow-2 py-4 px-4 md:px-6 2xl:px-11'>
        <div className='flex items-center gap-4 lg:hidden'>
          <button
            aria-controls='sidebar'
            onClick={(e) => {
              e.stopPropagation()
              props.setSidebarOpen(!props.sidebarOpen)
            }}
            className='z-[99999] block lg:hidden'
          >
            <RiMenu2Fill className='w-6 h-6' />
          </button>

          <Link className='block flex-shrink-0 lg:hidden' to='/'>
            <h1 className='text-3xl font-medium text-primary'>ZCAD</h1>
          </Link>
        </div>

        <div className='flex items-center gap-3'>
          <div className='relative group'>
            <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-primary'>
              <Link
                to='/notifications'
                className='flex items-center justify-center w-full h-full text-gray-600 group-hover:text-white'
              >
                <BiBell className='text-xl' />
              </Link>

              {/* <div className='absolute -top-1 right-0 w-4 h-5 bg-red-500 rounded-full text-sm text-white pl-1'>2</div> */}
            </div>

            <span className='absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity'>
              Notifications
            </span>
          </div>

          <div className='relative group'>
            <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-primary'>
              <Link
                to='/announcements'
                className='flex items-center justify-center w-full h-full text-gray-600 group-hover:text-white'
              >
                <HiOutlineSpeakerphone className='text-xl' />
              </Link>
            </div>
            <span className='absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity'>
              Announcements
            </span>
          </div>

          <div className='relative group'>
            <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-primary'>
              <Link
                to='/knowledgebase'
                className='flex items-center justify-center w-full h-full text-gray-600 group-hover:text-white'
              >
                <FaBook className='text-xl' />
              </Link>
            </div>
            <span className='absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity'>
              Knowledgebase
            </span>
          </div>

          <div className='relative group'>
            <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-primary'>
              <Link
                to='/profile'
                className='flex items-center justify-center w-full h-full text-gray-600 group-hover:text-white'
              >
                  {profileData && profileData?.avtar ?
                <div className='w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-orange-100 hover:bg-orange-200'>
                  <img
                    src={profileData.avtar}
                    alt='Profile'
                    className='w-full h-full rounded-full object-cover'
                  />
                </div>
                :
                <div className='w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-orange-500 hover:bg-orange-600'>
                  <CiUser className='text-xl' />
                </div>
              }
              </Link>
            </div>
            <span className='absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity'>
              Profile
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

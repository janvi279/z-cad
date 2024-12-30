import { Link } from 'react-router-dom'
import { RiMenu2Fill } from 'react-icons/ri'
import { FiSearch, FiMail, FiPlus } from 'react-icons/fi'
import { CiUser } from 'react-icons/ci'
import { useEffect, useRef, useState } from 'react'
import Searchbar from './Searchbar'

const Header = (props) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchRef = useRef(null)

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


        <div className='flex items-center gap-2 lg:gap-4'>
          <div className='relative group'>
            <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-primary'>
              <Link
                to='/profile'
                className='flex items-center justify-center w-full h-full text-gray-600 group-hover:text-white'
              >
                <CiUser className='text-xl' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { MdHome, MdOutlinePayment } from 'react-icons/md'
import {
  AiOutlineLogout,
  AiOutlineProduct,
  AiOutlineShoppingCart
} from 'react-icons/ai'
import { FaAngleDown, FaBookOpen } from 'react-icons/fa'
import { GoFileMedia } from "react-icons/go";
import { LuRepeat2 } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";

import { removeToken } from '../../utils/cookies/Cookies'

const dataList = [
  {
    label: 'Home',
    icon: <MdHome />,
    path: '/',
  },
  {
    label: 'Media',
    icon: <GoFileMedia />,
    path: '/media',
  },
  {
    label: 'Products',
    icon: <AiOutlineProduct />,
    path: '/products',
  },
  {
    label: 'Orders',
    icon: <AiOutlineShoppingCart />,
    path: '/orders',
  },
  {
    label: 'Refund',
    icon: <LuRepeat2 />,
    path: '/refund',
  },
  {
    label: 'Settings',
    icon: <IoSettingsOutline />,
    path: '/settings',
  },
  {
    label: 'Payments',
    icon: <MdOutlinePayment />,
    path: '/payments',
  },
  {
    label: 'Ledger Book',
    icon: <FaBookOpen />,
    path: '/ledger-book',
  },
  {
    label: 'Reviews',
    icon: <FaRegMessage />,
    path: '/reviews',
  },
]

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation()
  const { pathname } = location

  const trigger = useRef(null)
  const sidebar = useRef(null)

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  )

  const [openSubmenu, setOpenSubmenu] = useState(null)

  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    setTimeout(() => {
      navigate('/login')
    }, 100)
  }

  // Close sidebar when clicking outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // Close sidebar on 'Escape' key press
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString())
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded')
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded')
    }
  }, [sidebarExpanded])

  return (
    <aside
      ref={sidebar}
      className={`absolute lg:static left-0 top-0 z-[9999] flex h-screen w-72 flex-col bg-white shadow-lg lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className='flex items-center gap-3 px-4 py-4'>
        <NavLink to='/' className='text-xl font-medium text-black'>
          ZCAD
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls='sidebar'
          aria-expanded={sidebarOpen}
          className='hidden'
        ></button>
      </div>
      <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
        <nav className='px-2'>
          <ul className='flex flex-col gap-1'>
            {dataList.map((item, index) => (
              <li key={index}>
                {/* Handle normal links */}
                {item.submenu ? (
                  <>
                    <button
                      onClick={() =>
                        setOpenSubmenu(openSubmenu === index ? null : index)
                      } // Toggle submenu
                      className={`flex items-center justify-between gap-3 rounded-lg py-3 px-3 text-gray-700 hover:bg-blue-50 ${openSubmenu === index
                        ? 'bg-blue-50 border-l-4 border-l-blue-500'
                        : ''
                        }`}
                    >
                      <div className='flex items-center gap-3'>
                        {item.icon}
                        <span className='font-medium'>{item.label}</span>
                      </div>
                      {/* Arrow icon with right margin */}
                      <FaAngleDown
                        className={`transform duration-200 ml-[120px] ${openSubmenu === index ? 'rotate-180' : ''
                          }`}
                      />
                    </button>

                    {openSubmenu === index && (
                      <ul className='pl-6'>
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <NavLink
                              to={subItem.path}
                              onClick={() => setSidebarOpen(!sidebarOpen)}
                              className={`flex items-center gap-3 rounded-lg py-3 px-3 text-gray-700 hover:bg-blue-50 ${pathname === subItem.path
                                ? 'bg-blue-50 w-full border-l-4 border-l-blue-500'
                                : ''
                                }`}
                            >
                              {subItem.icon}
                              <span className='font-medium'>
                                {subItem.label}
                              </span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className={`flex items-center gap-3 rounded-lg py-3 px-3 text-gray-700 hover:bg-blue-50 ${pathname === item.path
                      ? 'bg-blue-50 border-l-4 border-l-blue-500'
                      : ''
                      }`}
                  >
                    {item.icon}
                    <span className='font-medium'>{item.label}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className='mt-auto py-4 border-t border-gray-200'>
        <button
          onClick={handleLogout}
          className='flex items-center gap-3 border-b w-full rounded-lg py-3 px-3 text-gray-700 hover:bg-blue-50'
        >
          <AiOutlineLogout className='text-xl' />
          <span className='font-medium'>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

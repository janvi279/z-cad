import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MdHome, MdOutlinePayment } from 'react-icons/md';
import {
  AiOutlineLogout,
  AiOutlineShoppingCart,
  AiOutlineUser
} from 'react-icons/ai';
import { GoFileMedia } from 'react-icons/go';
import { LuRepeat2 } from 'react-icons/lu';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaRegMessage } from 'react-icons/fa6';
import { PiMoney } from 'react-icons/pi';
import { FiMenu,FiCheckCircle } from 'react-icons/fi'; // Hamburger menu icon
import { removeToken } from '../../utils/cookies/Cookies';
import { AuthContext } from '../../Context/AuthContext';

// Navigation data
const dataList = [
  { label: 'Home', icon: <MdHome />, path: '/' },
  { label: 'Media', icon: <GoFileMedia />, path: '/media' },
  { label: 'Products', icon: <AiOutlineShoppingCart />, path: '/products' },
  { label: 'Orders', icon: <AiOutlineShoppingCart />, path: '/orders' },
  { label: 'Refund', icon: <LuRepeat2 />, path: '/refund' },
  { label: 'Settings', icon: <IoSettingsOutline />, path: '/settings' },
  { label: 'Payments', icon: <MdOutlinePayment />, path: '/payments' },
  { label: 'Ledger Book', icon: <PiMoney />, path: '/ledger-book' },
  { label: 'Reviews', icon: <FaRegMessage />, path: '/reviews' },
  { label: 'Author Info', icon: <AiOutlineUser />, path: '/author-info' },
  {label: 'Author Request', icon: <FiCheckCircle />, path: '/author-request'},
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { getProfile, removeProfile } = useContext(AuthContext);
  const profileData = getProfile();

  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? true : storedSidebarExpanded === 'true'
  );

  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    removeToken();
    setTimeout(() => {
      navigate('/login');
    }, 100);
    removeProfile();
  };

  // Save expanded state in localStorage
  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
  }, [sidebarExpanded]);

  // Close sidebar on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // Close sidebar on 'Escape' key press
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const filteredDataList = dataList.filter(item => {
    switch (profileData?.role) {
      case "ADMIN":
        return item.label === 'Home' || item.label === 'Author Info' || item.label === 'Author Request';

      case "AUTHOR":
        return item.label !== 'Author Info' || item.label !== 'Author Request';

      default:
        return true;
    }
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute lg:static left-0 top-0 z-50 flex h-screen flex-col bg-white shadow-lg lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }  transition-[width] duration-300 ${sidebarExpanded ? 'w-72' : 'w-20'}`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 py-4">
        {/* Sidebar Title */}
        <NavLink to="/" className={`text-xl font-medium text-black ${!sidebarExpanded ? 'hidden' : ''}`}>
          ZCAD
        </NavLink>
        {/* Hamburger Icon */}
        <button
          ref={trigger}
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          className="text-gray-500 hover:text-black focus:outline-none"
        >
          <FiMenu className="text-2xl" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="px-2">
          <ul className="flex flex-col gap-1">
            {filteredDataList.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg py-3 px-3 text-gray-700 hover:bg-primary-50 ${pathname === item.path
                    ? 'bg-primary-50 border-l-4 border-primary-500'
                    : ''
                    }`}
                  title={!sidebarExpanded ? item.label : ''}
                >
                  {item.icon}
                  {sidebarExpanded && <span className="font-medium">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Logout Section */}
      <div className="mt-auto py-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full rounded-lg py-3 px-3 text-gray-700 hover:bg-primary-50"
        >
          <AiOutlineLogout className="text-xl" />
          {sidebarExpanded && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

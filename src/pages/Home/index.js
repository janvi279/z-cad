import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import WelcomeBox from './WelcomeBox';
import SalesChart from './SalesChart';
import StoreAnalytics from './StoreAnalytics';
import SalesByProduct from './SalesByProduct';
import Notifications from './Notifications';
import LatestTopic from './LatestTopic';
import StoreStatus from './StoreStatus';

const Home = () => {
  const [activeButton, setActiveButton] = useState('salesByDate'); 
  const navigate = useNavigate(); 

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === 'outOfStock') {
      navigate('/out-of-stock'); 
    }
  };

  return (
    <>
      <div className='w-full bg-white p-4 flex gap-5'>
        <div
          className={`border-1 p-2 rounded-lg text-sm text-gray-600 hover:bg-primary-100 ${
            activeButton === 'salesByDate' ? 'bg-primary-100 text-primary-600' : 'hover:text-primary-600'
          }`}
          onClick={() => handleButtonClick('salesByDate')}
        >
          <button>Sales By Date</button>
        </div>
        <div
          className={`border-1 p-2 rounded-lg text-sm text-gray-600 hover:bg-primary-100 ${
            activeButton === 'outOfStock' ? 'bg-primary-100 text-primary-600' : 'hover:text-primary-600'
          }`}
          onClick={() => handleButtonClick('outOfStock')}
        >
          <button>Out of the Stock</button>
        </div>
      </div>

      <WelcomeBox />
      <SalesChart />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10'>
        <StoreAnalytics />
        <SalesByProduct />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10'>
        <Notifications />
        <LatestTopic />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <StoreStatus />
      </div>
    </>
  );
};

export default Home;

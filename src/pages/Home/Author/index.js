import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance';

import WelcomeBox from './WelcomeBox';
import SalesChart from './SalesChart';
import StoreAnalytics from './StoreAnalytics';
import SalesByProduct from './SalesByProduct';
import StoreStatus from './StoreStatus';
import OutOfTheStock from './OutOfTheStock';
import { useLoading } from '../../../Context/LoadingContext';

const Home = () => {
  const [activeButton, setActiveButton] = useState('salesByDate');
  const [hasProduct, setHasProduct] = useState(true); // default true to avoid flash
  const { setLoading } = useLoading();

  const navigate = useNavigate();

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  useEffect(() => {
    setLoading(true)
    const checkAuthorProduct = async () => {
      try {
        const { data } = await axiosAuthInstance.get('author/has-products'); // This should return { hasProduct: true/false }
        setHasProduct(data?.hasProduct);
      } catch (error) {
        console.error('Failed to check author products:', error);
        setHasProduct(false); // fallback
      } finally {
        setLoading(false)
      }
    };

    checkAuthorProduct();
  }, []);



  if (!hasProduct) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">👋 Welcome, Author!</h2>
        <p className="text-gray-600 mt-2">
          Before you can view orders or payments, please add your products.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate('/products')}
        >
          Add Product Now
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-white p-4 flex gap-5">
        <div
          className={`border-1 p-2 rounded-lg text-sm text-gray-600 hover:bg-primary-100 ${activeButton === 'salesByDate'
              ? 'bg-primary-100 text-primary-600'
              : 'hover:text-primary-600'
            }`}
          onClick={() => handleButtonClick('salesByDate')}
        >
          <button>Sales By Date</button>
        </div>
        <div
          className={`border-1 p-2 rounded-lg text-sm text-gray-600 hover:bg-primary-100 ${activeButton === 'outOfStock'
              ? 'bg-primary-100 text-primary-600'
              : 'hover:text-primary-600'
            }`}
          onClick={() => handleButtonClick('outOfStock')}
        >
          <button>Out of the Stock</button>
        </div>
      </div>

      {activeButton === 'outOfStock' ? (
        <OutOfTheStock />
      ) : (
        <>
          <WelcomeBox />
          <SalesChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            <StoreAnalytics />
            <SalesByProduct />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            <StoreStatus />
          </div>
        </>
      )}
    </>
  );
};

export default Home;

import React, { useState } from 'react';
import CustomerSupport from './CustomerSupport';
import StoreHours from './StoreHours';
import Location from './Location';
import Payment from './Payment';
import Seo from './Seo';
import Store from './Store';

const Settings = () => {
  const [activeComponent, setActiveComponent] = useState('Store'); 

  const renderComponent = () => {
    if (activeComponent === 'Store') {
      return <Store />;
    }
    if (activeComponent === 'Location') {
      return <Location />;
    }
    if (activeComponent === 'Payment') {
      return <Payment />;
    }
    if (activeComponent === 'SEO') {
      return <Seo />;
    }
    if (activeComponent === 'CustomerSupport') {
      return <CustomerSupport />;
    }
    if (activeComponent === 'StoreHours') {
      return <StoreHours />;
    }
  };

  return (
    <>
      <div className="bg-white shadow rounded-lg text-primary-500 text-xl p-2 flex justify-between items-center mb-6">
        Store Settings
      </div>
      
      <div className="flex">
        {/* Left-side navigation */}
        <div className="w-1/4 bg-gray-100 p-4 shadow">
          <ul className="space-y-1 ">
            <li>
              <button
                className={`w-full text-left py-2 px-4 rounded ${
                  activeComponent === 'Store' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => setActiveComponent('Store')}
              >
                Store
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left py-2 px-4 rounded ${
                  activeComponent === 'Location' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => setActiveComponent('Location')}
              >
                Location
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left py-2 px-4 rounded ${
                  activeComponent === 'Payment' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => setActiveComponent('Payment')}
              >
                Payment
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left py-2 px-4 rounded ${
                  activeComponent === 'SEO' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => setActiveComponent('SEO')}
              >
                SEO
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left py-2 px-4 rounded ${
                  activeComponent === 'CustomerSupport' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => setActiveComponent('CustomerSupport')}
              >
                Customer Support
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left py-2 px-4 rounded ${
                  activeComponent === 'StoreHours' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => setActiveComponent('StoreHours')}
              >
                Store Hours
              </button>
            </li>
          </ul>
        </div>

        {/* Main content area */}
        <div className="w-3/4 p-6">{renderComponent()}</div>
      </div>
    </>
  );
};

export default Settings;

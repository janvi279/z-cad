import React, { useState } from 'react';
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
    if (activeComponent === 'StoreHours') {
      return <StoreHours />;
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow rounded-lg text-primary-500 text-xl p-4 flex justify-between items-center mb-6">
        Store Settings
      </div>

      {/* Responsive Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-1/4 bg-gray-100 p-4 shadow mb-4 lg:mb-0">
          <ul className="space-y-2">
            {[
              { label: 'Store', key: 'Store' },
              { label: 'Location', key: 'Location' },
              { label: 'Payment', key: 'Payment' },
              { label: 'SEO', key: 'SEO' },
              { label: 'Store Hours', key: 'StoreHours' },
            ].map((item) => (
              <li key={item.key}>
                <button
                  className={`w-full text-left py-2 px-4 rounded transition ${
                    activeComponent === item.key
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveComponent(item.key)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 lg:pl-6">
          <div>{renderComponent()}</div>
        </div>
      </div>
    </>
  );
};

export default Settings;

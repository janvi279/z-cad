import React, { useState } from 'react';
import Personal from './Personal';
import Address from './Address';
import Social from './Social';

const Profile = () => {
  const [activeComponent, setActiveComponent] = useState('Personal');

  const renderComponent = () => {
    if (activeComponent === 'Personal') {
      return <Personal />;
    }
    if (activeComponent === 'Address') {
      return <Address />;
    }
    if (activeComponent === 'Social') {
      return <Social />;
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow rounded-lg text-primary-500 text-xl p-4 flex justify-between items-center mb-6">
        Profile Manager
      </div>

      {/* Responsive Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-1/4 bg-gray-100 p-4 shadow mb-4 lg:mb-0">
          <ul className="space-y-2">
            {[
              { label: 'Personal', key: 'Personal' },
              { label: 'Address', key: 'Address' },
              { label: 'Social', key: 'Social' },
            ].map((item) => (
              <li key={item.key}>
                <button
                  className={`w-full text-left py-2 px-4 rounded transition-all ${
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
          {renderComponent()}
        </div>
      </div>
    </>
  );
};

export default Profile;

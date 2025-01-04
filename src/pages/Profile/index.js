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
      <div className="bg-white shadow rounded-lg text-primary-500 text-xl p-4 flex justify-between items-center mb-6">
        <h1 className="font-bold">Profile Manager</h1>
      </div>

      <div className="flex">
        <div className="w-1/4 bg-gray-100 p-4 shadow">
          <ul className="space-y-1">
            <li>
              <button
                className={`w-full text-left py-2 px-4 rounded ${
                  activeComponent === 'Personal' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => setActiveComponent('Personal')}
              >
                Personal
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left py-2 px-4 rounded ${
                  activeComponent === 'Address' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => setActiveComponent('Address')}
              >
                Address
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left py-2 px-4 rounded ${
                  activeComponent === 'Social' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => setActiveComponent('Social')}
              >
                Social
              </button>
            </li>
          </ul>
        </div>

        <div className="w-3/4 pl-6">{renderComponent()}</div>
      </div>
    </>
  );
};

export default Profile;

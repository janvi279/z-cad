import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosCommonInstance from '../../../utils/axios/axiosCommanInstance';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axiosCommonInstance.post('auth/forgot-password', { email });
      if (response.status === 200) {
        toast.success(response?.data?.message);
        navigate('/reset-password', { state: { email } }); 
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
        <div className="w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-lg font-medium leading-6 text-gray-900"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                autoComplete="email"
                required
                className="block p-2 w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 outline-none sm:text-sm sm:leading-6"
                placeholder="Enter Email"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

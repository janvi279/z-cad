import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import axiosCommonInstance from "../../../utils/axios/axiosCommanInstance"; 

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle OTP Submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosCommonInstance.post('auth/verify-otp', {
        email,  
        otp
      });

      if (response.status === 200) {
        toast.success(response?.data?.message);
        setOtpSubmitted(true);  
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  // Handle Password Submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      try {
        const res = await axiosCommonInstance.post("auth/reset-password", {
          email: email,  
          token: otp,  
          newPassword: newPassword
        });

        if (res.status === 200) {
          toast.success(res?.data?.message);
          navigate("/login");  
        }
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    } else {
      toast.error("Passwords do not match.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:max-w-md w-full">
        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Your Password
        </h2>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          {!otpSubmitted ? (
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900">
                  Enter OTP
                </label>
                <div className="mt-2">
                  <input
                    id="otp"
                    name="otp"
                    type="number"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    required
                    maxLength="6"
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset outline-none ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  New Password
                </label>
                <div className="mt-2 relative">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    minLength="6"
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                  <div
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showNewPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm New Password
                </label>
                <div className="mt-2 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                  <div
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showConfirmPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Reset Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

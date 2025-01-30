import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setToken } from '../../../utils/cookies/Cookies';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import ZCADLogo from '../../../ZCADICON.png'
import axiosCommonInstance from '../.././../utils/axios/axiosCommanInstance';
import { AuthContext } from '../../../Context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { saveProfile } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    if (validateForm()) {
      axiosCommonInstance
        .post('/auth/login', {
          email,
          password,
        })
        .then((res) => {
          setToken(res.data?.token);
          saveProfile(res.data?.user);
          navigate('/');
        })
        .catch((err) => {
          console.log('err :>> ', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='w-full bg-white shadow-2xl rounded-lg max-w-md mx-auto p-8'>
        <div className='flex flex-col items-center gap-6 mb-8'>
          <div className='rounded-full border-2 border-primary-500 p-4'>
         <img className='h-[80px]' src={ZCADLogo} alt="ZCAD Logo" />
         </div>
        </div>
        <h2 className='text-2xl font-semibold text-center mb-8'>Login</h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <label className='block text-lg font-medium text-gray-700'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              value={email}
              onChange={handleEmailChange}
              className='block w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 outline-none transition duration-200'
              placeholder='Enter Email'
            />
            {emailError && <p className='text-red-500 text-sm mt-1'>{emailError}</p>}
          </div>
          <div className='space-y-2 relative'>
            <label className='block text-lg font-medium text-gray-700'>Password</label>
            <input
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='current-password'
              value={password}
              onChange={handlePasswordChange}
              className='block w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 outline-none transition duration-200'
              placeholder='Enter Password'
            />
            <div
              className='absolute right-3 top-[60%] transform -translate-y-1/2 cursor-pointer'
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FiEyeOff className='text-gray-500' />
              ) : (
                <FiEye className='text-gray-500' />
              )}
            </div>
            {passwordError && <p className='text-red-500 text-sm mt-1'>{passwordError}</p>}
          </div>
          <div className='flex justify-between'>
            <div className='text-left'>
              <Link
                to='/forgot-password'
                className='text-sm text-primary-500 hover:text-primary-600 transition duration-200'
              >
                Forgot password?
              </Link>
            </div>
            <div className='text-right'>
              <Link
                to='/register'
                className='text-sm text-primary-500 hover:text-primary-600 transition duration-200'
              >
                Register
              </Link>
            </div>
          </div>
          <button
            type='submit'
            disabled={!!emailError || !!passwordError || loading}
            className='w-full py-3 px-4 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition duration-200 flex items-center justify-center'
          >
            {loading ? (
              <div className='w-5 h-5 border-2 border-white border-solid rounded-full animate-spin border-t-transparent'></div>
            ) : (
              'Log in'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
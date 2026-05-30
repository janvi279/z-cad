import axios from 'axios'
import { getToken } from '../cookies/Cookies'
import toast from 'react-hot-toast'

const baseURL = 'http://localhost:8015/api/';
// const baseURL = 'https://zcadgroup.alphabitinfoway.com/api/'
// const baseURL="http://89.116.32.101/api/"

const axiosInstance = axios.create({
  baseURL,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {

    return Promise.reject(error)
  },
)
// axiosInstance.interceptors.response.use(
//   (response) => response, // just return response if ok
//   (error) => {
//     console.log("🚀 ~ error:", error)
//     const status = error.response?.status
//     if (status === 401) {
//       toast.error('Session expired. Redirecting to login...')

//       // Optional: clear token or cookies
//       // removeToken()

//       // Redirect to login page
//       // window.location.href = '/login'  // or '/home' if needed
//     }
//     return Promise.reject(error)
//   }
// )
const axiosAuthInstance = {
  get: async (url, params = {}) => {
    try {
      const response = await axiosInstance.get(url, { params })

      return response
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.')
      throw error
    }
  },
  post: async (url, data) => {
    try {
      const response = await axiosInstance.post(url, data)
      toast.success(response?.data?.message)
      return response
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.')
    }
  },
  put: async (url, data) => {
    try {
      const response = await axiosInstance.put(url, data)
      toast.success(response?.data?.message)
      return response
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.')
    }
  },
  delete: async (url, data) => {
    try {
      const response = await axiosInstance.delete(url, data)
      toast.success(response?.data?.message)
      return response
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.')
    }
  },
}

export default axiosAuthInstance

import axios from 'axios'
import toast from 'react-hot-toast'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:6000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

const axiosCommonInstance = {
  get: async (url, params = {}) => {
    try {
      const response = await axiosInstance.get(url, { params })
      return response
    } catch (error) {
      // Check if error.response exists before accessing error.response.data
      const errorMessage = error.response?.data?.message || 'An error occurred.'
      toast.error(errorMessage)
    }
  },
  post: async (url, data) => {
    try {
      const response = await axiosInstance.post(url, data)
      return response
    } catch (error) {
      // Check if error.response exists before accessing error.response.data
      const errorMessage = error.response?.data?.message || 'An error occurred.'
      toast.error(errorMessage)
    }
  },
  put: async (url, data) => {
    try {
      const response = await axiosInstance.put(url, data)
      return response
    } catch (error) {
      // Check if error.response exists before accessing error.response.data
      const errorMessage = error.response?.data?.message || 'An error occurred.'
      toast.error(errorMessage)
    }
  },
  delete: async (url, data) => {
    try {
      const response = await axiosInstance.delete(url, data)
      return response
    } catch (error) {
      // Check if error.response exists before accessing error.response.data
      const errorMessage = error.response?.data?.message || 'An error occurred.'
      toast.error(errorMessage)
    }
  },
}

export default axiosCommonInstance

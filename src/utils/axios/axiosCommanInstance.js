import axios from 'axios'
import toast from 'react-hot-toast'

// const baseURL: 'http://localhost:8015/api/',
const baseURL = "https://zcadgroup.alphabitinfoway.in/api/";

const axiosInstance = axios.create({
  baseURL,
})

const axiosCommonInstance = {
  get: async (url, params = {}) => {
    try {
      const response = await axiosInstance.get(url, { params })
      return response
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred.'
      toast.error(errorMessage)
    }
  },
  post: async (url, data) => {
    try {
      const response = await axiosInstance.post(url, data)
      return response
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred.'
      toast.error(errorMessage)
    }
  },
  put: async (url, data) => {
    try {
      const response = await axiosInstance.put(url, data)
      return response
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred.'
      toast.error(errorMessage)
    }
  },
  delete: async (url, data) => {
    try {
      const response = await axiosInstance.delete(url, data)
      return response
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred.'
      toast.error(errorMessage)
    }
  },
}

export default axiosCommonInstance

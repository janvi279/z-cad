import axiosAuthInstance from '../../../../utils/axios/axiosAuthInstance'

export const distributorLogin = async (data) => {
  const response = await axiosAuthInstance.post(`distributor/login`, data)

  return response.data
}
export const getDistributorDashboard = () =>
  axiosAuthInstance.get('/distributor/dashboard')

export const getDistributorProfile = () =>
  axiosAuthInstance.get('/distributor/profile')

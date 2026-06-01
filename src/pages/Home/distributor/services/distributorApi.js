import axiosAuthInstance from '../../../../utils/axios/axiosAuthInstance'

export const distributorLogin = async (data) => {
  const response = await axiosAuthInstance.post(`distributor/login`, data)

  return response.data
}

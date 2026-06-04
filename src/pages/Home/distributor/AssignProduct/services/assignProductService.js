import axiosAuthInstance from '../../../../../utils/axios/axiosAuthInstance'

export const getAssignedProducts = () =>
  axiosAuthInstance.get('distributor/assigned-products-admin')

export const getBooks = () => axiosAuthInstance.get('book/all-books')

export const getDistributors = () => axiosAuthInstance.get('distributor/all')

export const assignProduct = (data) =>
  axiosAuthInstance.post('distributor/assign-product', data)

export const updateAssignment = (id, data) =>
  axiosAuthInstance.put(`/distributor/assignment/${id}`, data)

// Delete Assignment
export const deleteAssignment = (id) =>
  axiosAuthInstance.delete(`/distributor/assignment/${id}`)

// Get Single Assignment (Optional)
export const getSingleAssignment = (id) =>
  axiosAuthInstance.get(`/distributor/assignment/${id}`)

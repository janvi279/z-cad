import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
import { CiImageOn } from 'react-icons/ci'
import { FiMoreHorizontal } from 'react-icons/fi'

const columns = [
  {
    name: (
      <>
        <FiMoreHorizontal title='Status' className='h-5 w-5' />
      </>
    ),
    selector: (row) => row.status,
  },
  { name: 'Order', selector: (row) => row.order },
  { name: 'Purchased', selector: (row) => row.purchased },
  { name: 'Gross Sales', selector: (row) => row.grossSales },
  { name: 'Date', selector: (row) => row.date },
  { name: 'Actions', selector: (row) => row.actions },
]

const ProductOptions = []

const OrderOptions = [
  { value: 'showAll', label: 'Show All' },
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'requested', label: 'Requested' },
  { value: 'paid', label: 'Paid' },
  { value: 'cancelled', label: 'Cancelled' },
]

const Orders = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pages, setPages] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalRows, setTotalRows] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const handlePageChange = (page) => setPages(page)

  const handlelimitChange = (newPerPage) => {
    setLimit(newPerPage)
    setPages(1)
  }

  const handleSearchChange = (e) => setSearchTerm(e.target.value)

  return (
    <>
      {/* Button Section */}
      <div className='bg-white shadow rounded-lg text-primary-500 text-xl p-2 flex justify-between items-center mb-6'>
        Order Sections
      </div>

      <div className='bg-white shadow p-4 rounded-lg'>
        <div className='flex justify-between items-center mb-4'>
          {/* Grouped Buttons and Selectors */}
          <div className='flex gap-4 items-center'>
            {/* Buttons */}
            <div className='flex gap-4 mb-4'>
              <button className='bg-blue-500 text-white py-2 px-4 rounded'>
                Print
              </button>
              <button className='bg-blue-500 text-white py-2 px-4 rounded'>
                PDF
              </button>
              <button className='bg-blue-500 text-white py-2 px-4 rounded'>
                EXCEL
              </button>
              <button className='bg-blue-500 text-white py-2 px-4 rounded'>
                CSV
              </button>
            </div>
            
            {/* Date Input */}
            <div className='inline-block'>
              <input
                type='date'
                className='px-4 py-2 text-sm border rounded-md text-gray-600'
                placeholder='Choose Date Range'
              />
            </div>

            {/* Selectors */}
            <div className='flex gap-4'>
              <Select
                options={ProductOptions}
                placeholder='Filter By Product'
                value={selectedProduct}
                onChange={setSelectedProduct}
              />
              <Select
                options={OrderOptions}
                placeholder='Filter By Order'
                value={selectedOrder}
                onChange={setSelectedOrder}
              />
            </div>
          </div>

          {/* Search Bar Positioned to the Right */}
          <input
            type='text'
            placeholder='Search...'
            className='border p-2 rounded-lg ml-auto'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationPerPage={limit}
          onChangePage={handlePageChange}
          onChangelimit={handlelimitChange}
        />
      </div>
    </>
  )
}

export default Orders

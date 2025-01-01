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
  { name: 'Request Id', selector: (row) => row.requestId },
  { name: 'Order Id', selector: (row) => row.orderId },
  { name: 'Amount', selector: (row) => row.amount },
  { name: 'Type', selector: (row) => row.type },
  { name: 'Reason', selector: (row) => row.reason },
  { name: 'Date', selector: (row) => row.date },
]

const RequestedOptions = [
  { value: 'showAll', label: 'Show All' },
  { value: 'approved', label: 'Approved' },
  { value: 'requested', label: 'Requested' },
  { value: 'cancelled', label: 'Cancelled' },
]

const Refund = () => {
  const [activeButton, setActiveButton] = useState('all')
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pages, setPages] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalRows, setTotalRows] = useState(0)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const handlePageChange = (page) => setPages(page)

  const handlelimitChange = (newPerPage) => {
    setLimit(newPerPage)
    setPages(1)
  }

  const handleSearchChange = (e) => setSearchTerm(e.target.value)


  return (
    <>
      {/* Button Section */}
      <div className='bg-white text-primary-500 text-xl p-2 flex justify-between items-center mb-6'>
        Refund Requests
      </div>

      <div className='bg-white p-4 rounded-lg'>
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

            {/* Selectors */}
            <div className='flex gap-4'>
              <Select
                options={RequestedOptions}
                placeholder='Filter By Requested'
                value={selectedRequest}
                onChange={setSelectedRequest}
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

export default Refund

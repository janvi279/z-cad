import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
import { CiImageOn } from 'react-icons/ci'
import { FiMoreHorizontal } from 'react-icons/fi'
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';

const columns = [
  {
    name: (
      <>
        <FiMoreHorizontal title='Status' className='h-5 w-5' />
      </>
    ),
     selector: (row) => `${row.transactions?.[0]?.status ?? ''}`,
  },
  { name: 'Request Id', selector: (row) => row.id },
  { name: 'Order Id', selector: (row) => row.order_id },
  { name: 'Amount', selector: (row) => `${row.transactions?.[0]?.amount ?? ''}`, },
  { name: 'Type', selector: (row) => `${row.transactions?.[0]?.kind ?? ''}`, },
  { name: 'Reason', selector: (row) => `${row.order_adjustments?.[0]?.reason ?? ''}`, },
{
  name: 'Date',
  selector: (row) =>
    row.created_at ? new Date(row.created_at).toLocaleDateString('en-IN') : 'N/A',
}

]

const RequestedOptions = [
  { value: 'showAll', label: 'Show All' },
  { value: 'approved', label: 'Approved' },
  { value: 'requested', label: 'Requested' },
  { value: 'cancelled', label: 'Cancelled' },
]

const Refund = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pages, setPages] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalRows, setTotalRows] = useState(0)
  const [selectedRequest, setSelectedRequest] = useState(null)

 const fetchData = async () => {
    try {
      const response = await axiosAuthInstance.get('shopify/refund')
      if (response && response.status === 200) {
        const transformedData = response.data.refunds.map((item) => ({
          ...item,
        }));
        console.log("response",response)

        setData(transformedData);
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handlePageChange = (page) => setPages(page)

  const handlelimitChange = (newPerPage) => {
    setLimit(newPerPage)
    setPages(1)
  }

  const handleSearchChange = (e) => setSearchTerm(e.target.value)

  return (
    <>
      {/* Button Section */}
      <div className='bg-white text-primary-500 rounded-lg shadow text-xl py-2 px-4 flex justify-between items-center mb-6'>
        Refund Requests
      </div>

      <div className='bg-white shadow p-4 rounded-lg'>
        <div className='flex justify-between gap-4 items-center mb-4'>
          <button className='bg-primary-500 text-white py-2 px-4 rounded'>
            Print
          </button>
          <button className='bg-primary-500 text-white py-2 px-4 rounded'>
            PDF
          </button>
          <button className='bg-primary-500 text-white py-2 px-4 rounded'>
            EXCEL
          </button>
          <button className='bg-primary-500 text-white py-2 px-4 rounded'>
            CSV
          </button>

          <Select
            options={RequestedOptions}
            placeholder='Filter By Requested'
            value={selectedRequest}
            onChange={setSelectedRequest}
          />

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
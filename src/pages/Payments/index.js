import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
import { FiMoreHorizontal } from 'react-icons/fi'
import { MdOutlineCurrencyRupee } from 'react-icons/md'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const columns = [
  {
    name: (
      <>
        <FiMoreHorizontal title='Status' className='h-5 w-5' />
      </>
    ),
    selector: (row) => row.status,
  },
  { name: 'Invoice Id', selector: (row) => row.invoiceId },
  { name: 'Order Ids', selector: (row) => row.orderIds },
  { name: 'Amount', selector: (row) => row.amount },
  { name: 'Charges', selector: (row) => row.charges },
  { name: 'Payment', selector: (row) => row.payment },
  { name: 'Mode', selector: (row) => row.mode },
  { name: 'Note', selector: (row) => row.note },
  { name: 'Date', selector: (row) => row.date },
]

const RequestedOptions = [
  { value: 'showAll', label: 'Show All' },
  { value: 'approved', label: 'Approved' },
  { value: 'processing', label: 'Processing' },
  { value: 'cancelled', label: 'Cancelled' },
]

const Payments = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pages, setPages] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalRows, setTotalRows] = useState(data.length)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const currentMonth = new Date().toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  })

  const handlePageChange = (page) => setPages(page)

  const handlelimitChange = (newPerPage) => {
    setLimit(newPerPage)
    setPages(1)
  }

  const handleSearchChange = (e) => setSearchTerm(e.target.value)

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  )

  return (
    <>
      <div className='bg-white shadow rounded-lg text-primary-500 text-xl py-2 px-4 flex justify-between items-center mb-6'>
        Transactions For: {currentMonth}
        <div className='relative group'>
          <button className='bg-primary-500 text-white px-3 py-1.5 rounded-lg hover:bg-primary-600 flex items-center gap-1'>
            <MdOutlineCurrencyRupee className='w-4 h-4' />
            <span className='text-sm'>Withdrawal</span>
          </button>
          <span className='absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            Withdrawal Requests
          </span>
        </div>
      </div>

      <div className='bg-white shadow p-4 rounded-lg'>
        <div className='flex flex-wrap gap-4 items-center mb-4'>
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

          <div className="inline-block">
            <DatePicker
              selected={startDate}
              onChange={(update) => setDateRange(update)}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              isClearable
              placeholderText="Choose Date Range"
              className="px-4 py-2 text-sm border rounded-md text-gray-600"
            />
          </div>

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
          data={filteredData}
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

export default Payments

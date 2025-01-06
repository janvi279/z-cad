import React, { useState } from 'react'
import { LuRepeat2 } from 'react-icons/lu'
import { PiMoney } from 'react-icons/pi'
import Select from 'react-select'
import DataTable from 'react-data-table-component'
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
  { name: 'Type', selector: (row) => row.type },
  { name: 'Details', selector: (row) => row.details },
  { name: 'Credit', selector: (row) => row.credit },
  { name: 'Debit', selector: (row) => row.debit },
  { name: 'Date', selector: (row) => row.date },
]

const LedgerBook = () => {
  const [selectedOption1, setSelectedOption1] = useState(null)
  const [selectedOption2, setSelectedOption2] = useState(null)
  const [data, setData] = useState([])
  const [pages, setPages] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalRows, setTotalRows] = useState(0)

  const handlePageChange = (page) => setPages(page)

  const handlelimitChange = (newPerPage) => {
    setLimit(newPerPage)
    setPages(1)
  }

  const options1 = [
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'refunded', label: 'Refunded' },
    { value: 'cancelled', label: 'Cancelled' },
  ]

  const options2 = [
    { value: 'order', label: 'Order' },
    { value: 'withdrawal', label: 'Withdrawal' },
    { value: 'refunded', label: 'Refunded' },
    { value: 'partialRefunded', label: 'Partial Refunded' },
    { value: 'charges', label: 'Charges' },
  ]

  return (
    <>
      <div className='bg-white shadow rounded-lg py-2 px-4 flex justify-between items-center mb-6'>
        <h1 className='text-xl text-primary-500'>Ledger Book</h1>
        <div className='flex gap-2'>
          <Select
            options={options1}
            placeholder='Show all...'
            value={selectedOption1}
            onChange={setSelectedOption1}
          />
          <Select
            options={options2}
            placeholder='Show all...'
            value={selectedOption2}
            onChange={setSelectedOption2}
          />
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-3 py-10 px-28'>
        <div className='flex shadow-md rounded-lg overflow-hidden'>
          <div className='bg-primary-400 p-4 flex items-center justify-center'>
            <span className='text-white text-xl'>₹</span>
          </div>
          <div className='bg-white p-4 flex-1'>
            <p className='text-lg font-medium'>₹0.00</p>
            <p className='text-sm text-gray-500'>Total Earning</p>
          </div>
        </div>

        <div className='flex shadow-md rounded-lg overflow-hidden'>
          <div className='bg-green-400 p-4 flex items-center justify-center'>
            <span className='text-white text-xl'>
              <PiMoney />
            </span>
          </div>
          <div className='bg-white p-4 flex-1'>
            <p className='text-lg font-medium'>₹0.00</p>
            <p className='text-sm text-gray-500'>Total Withdrawal</p>
          </div>
        </div>

        <div className='flex shadow-md rounded-lg overflow-hidden'>
          <div className='bg-pink-500 p-4 flex items-center justify-center'>
            <span className='text-white text-xl'>
              <LuRepeat2 />
            </span>
          </div>
          <div className='bg-white p-4 flex-1'>
            <p className='text-lg font-medium'>₹0.00</p>
            <p className='text-sm text-gray-500'>Total Refund</p>
          </div>
        </div>
      </div>

      <div className='bg-white p-4 rounded-lg shadow'>
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

export default LedgerBook

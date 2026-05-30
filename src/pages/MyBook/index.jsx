import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'
import { Link } from 'react-router-dom'
import { FiEye, FiEdit,FiPackage } from 'react-icons/fi'
import toast from "react-hot-toast"
import { FaEye, FaCheckCircle} from 'react-icons/fa'

const getStatusColor = (status) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-100 text-green-600'

    case 'Rejected':
      return 'bg-red-100 text-red-600'

    case 'Editing':
      return 'bg-blue-100 text-blue-600'

    case 'Published':
      return 'bg-purple-100 text-purple-600'

    default:
      return 'bg-yellow-100 text-yellow-600'
  }
}
const getStatusColorCurrentStage = (
  stage,
) => {
  switch (stage) {
    case 'Editing':
      return 'bg-blue-100 text-blue-600'

    case 'Proofreading':
      return 'bg-cyan-100 text-cyan-600'

    case 'Layout Design':
      return 'bg-indigo-100 text-indigo-600'

    case 'Final Proof Reading':
      return 'bg-orange-100 text-orange-600'

    case 'Printing':
      return 'bg-pink-100 text-pink-600'

    case 'Binding':
      return 'bg-yellow-100 text-yellow-700'

    case 'Published':
      return 'bg-green-100 text-green-600'

    default:
      return 'bg-gray-100 text-gray-600'
  }
}

const MyBook = () => {
  const [data, setData] = useState([])
  const [pages, setPages] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalRows, setTotalRows] = useState(0)
  const [search, setSearch] =
  useState('')

  const fetchData = async () => {
    try {
      const response =
  await axiosAuthInstance.get(
    `book/my-books?search=${search}`,
  )
      if (response) {
        const transformedData = response.data.data.map((item) => ({
          ...item,
          actions: (
            <div className='flex items-center'>
              <div className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary pointer hover:text-primary-600 text-primary-500'>
                <Link to={`view/${item._id}`}>
                  <FiEye className='w-4 h-4' />
                </Link>
              </div>
              <Link
                to={`edit/${item._id}`}
                className='w-8 h-8 flex items-center justify-center rounded-full  text-primary-600'
              >
                <FiEdit className='w-4 h-4' />
              </Link>
             
            {
  item.currentStage ===
    'Published' && (
    <Link
      to={`analytics/${item._id}`}
      className='w-8 h-8 flex items-center justify-center rounded-full text-purple-600'
      title='Inventory Analytics'
    >
      <FiPackage className='w-4 h-4' />
    </Link>
  )
}
            </div>
          ),
        }))
        setData(transformedData)
        setTotalRows(response.data.result.totalDocs)
      }
    } catch (error) {
      console.log('Error fetching author data:', error)
    }
  }
  const handleContractStatus = async (
  bookId,
  status,
) => {
  try {
    const response =
      await axiosAuthInstance.put(
        `/book/contract-status/${bookId}`,
        {
          contractStatus: status,
        },
      )

    if (response.data.success) {
      toast.success(
        `Contract ${status}`,
      )

      fetchData()
    }
  } catch (error) {
    console.log(error)
  }
}
  const columns = [
    {
      name: 'Cover',
      cell: (row) => (
        <img
          src={row.coverImage}
          alt='cover'
          className='w-14 h-16 rounded object-cover border'
        />
      ),
      width: '100px',
    },
    { name: 'Book', selector: (row) => row.title },
    { name: 'Category', selector: (row) => row.category },
    {
      name: 'Book Status',
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            row.status||"pending",
          )}`}
        >
          {row.status}
        </span>
      ),
    },
    {
  name: 'Book Update Stage',
  cell: (row) => (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColorCurrentStage(
        row.currentStage || '',
      )}`}
    >
      {row.currentStage || '-'}
    </span>
  ),
},

    {
  name: 'Contract',

  cell: (row) => (
    <>
      {row.contractGenerated ? (
        <div className='flex gap-2'>

          {/* VIEW */}

          <Link
            to={`/my-contract/view/${row._id}`}
            className='w-8 h-8 flex items-center justify-center rounded-full text-primary-600'
          >
            <FaEye  />
          </Link>

          {/* ACCEPT */}

          {row.contractStatus ===
            'Pending' && (
            <>
              <button
                onClick={() =>
                  handleContractStatus(
                    row._id,
                    'Accepted',
                  )
                }
                className='bg-green-500 text-white px-3 py-1 rounded'
              >
            
                Accept
              </button>

              <button
                onClick={() =>
                  handleContractStatus(
                    row._id,
                    'Rejected',
                  )
                }
                className='bg-red-500 text-white px-3 py-1 rounded'
              >
                Reject
              </button>
            </>
          )}

          {/* ACCEPTED */}

          {row.contractStatus ===
            'Accepted' && (
            <span className=' text-green-600 w-8 h-8 flex items-center justify-center rounded-full'>
              <FaCheckCircle  />
              
            </span>
          )}

          {/* REJECTED */}

          {row.contractStatus ===
            'Rejected' && (
            <span className='bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm'>
              Rejected
            </span>
          )}
        </div>
      ) : (
        <span className='text-gray-400 text-sm'>
          No Contract
        </span>
      )}
    </>
  ),
},
   

    { name: 'Actions', selector: (row) => row.actions },
  ]
 

  const handlePageChange = (newPage) => {
    setPages(newPage)
  }

  const handleLimitPerPageChange = (newLimit) => {
    setLimit(newLimit)
    setPages(1)
  }

useEffect(() => {
  fetchData()
}, [
  pages,
  limit,
  search,
])

  return (
    <div className='p-3'>
      <h1 className='text-2xl mb-3'>My Books</h1>
      <div className='mb-4'>
  <input
    type='text'
    placeholder='Search Book...'
    value={search}
    onChange={(e) =>
      setSearch(
        e.target.value,
      )
    }
    className='border p-2 rounded-lg w-80'
  />
</div>
      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitPerPageChange}
      />
    </div>
  )
}

export default MyBook

import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'
import { Link } from 'react-router-dom'
import { FiEye, FiEdit } from 'react-icons/fi'

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

const MyBook = () => {
  const [data, setData] = useState([])
  const [pages, setPages] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalRows, setTotalRows] = useState(0)

  const fetchData = async () => {
    try {
      const response = await axiosAuthInstance.get('book/my-books')
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
      name: 'Status',
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            row.status,
          )}`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: 'Update Stage',
      cell: (row) => (
        <select
          className='border rounded px-2 py-1'
          value={row.currentStage || 'Editing'}
          onChange={(e) => handleStageUpdate(row._id, e.target.value)}
        >
          <option value='Editing'>Editing</option>
          <option value='Proofreading'>Proofreading</option>
          <option value='Layout Design'>Layout Design</option>
          <option value='Final Proof Reading'>Final Proof Reading</option>
          <option value='Printing'>Printing</option>
          <option value='Binding'>Binding</option>
          <option value='Published'>Published</option>
        </select>
      ),
    },

    { name: 'Actions', selector: (row) => row.actions },
  ]
  const handleStageUpdate = async (bookId, stage) => {
    try {
      const response = await axiosAuthInstance.put(
        `/book/update-book-stage/${bookId}`,
        {
          stepName: stage,
          status: 'Completed',
        },
      )

      if (response.data.success) {
        setData((prev) =>
          prev.map((item) => {
            if (item._id === bookId) {
              return {
                ...item,
                currentStage: stage,
                trackingSteps:
                  response.data.result?.trackingSteps || item.trackingSteps,
              }
            }

            return item
          }),
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handlePageChange = (newPage) => {
    setPages(newPage)
  }

  const handleLimitPerPageChange = (newLimit) => {
    setLimit(newLimit)
    setPages(1)
  }

  useEffect(() => {
    fetchData()
  }, [pages, limit])

  return (
    <div className='p-3'>
      <h1 className='text-2xl mb-3'>My Books</h1>
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

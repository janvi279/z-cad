import { useState, useEffect, useCallback } from 'react'
import DataTable from 'react-data-table-component'
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'
import { Link } from 'react-router-dom'
import { FiEye } from 'react-icons/fi'

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

const AuthorInfo = () => {
  const [data, setData] = useState([])
  const [pages, setPages] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalRows, setTotalRows] = useState(0)

  // Fetch Books
  const fetchData = useCallback(async () => {
    try {
      const response = await axiosAuthInstance.get('book/all-books', {
        page: pages,
        limit: limit,
        status: 'Pending Review',
      })

      if (response) {
        const transformedData = response.data.result.docs.map((item) => ({
          ...item,
          actions: (
            <div className='flex items-center gap-5'>
              <div className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary pointer hover:text-primary-600 text-primary-500'>
                <Link to={`view/${item._id}`}>
                  <FiEye className='w-4 h-4' />
                </Link>
              </div>
              <button
                onClick={() => handleApprove(item._id)}
                className='bg-primary-500 text-white px-4 py-2 rounded'
              >
                Approve
              </button>
            </div>
          ),
        }))
        setData(transformedData)
        setTotalRows(response.data.result.totalDocs)
      }
    } catch (error) {
      console.log('Error fetching books:', error)
    }
  }, [pages, limit])

  // Approve Book
  const handleApprove = async (id) => {
    try {
      await axiosAuthInstance.put(`/book/update-status/${id}`, {
        status: 'Approved',
        adminNote: 'Book approved successfully',
      })

      fetchData()
    } catch (error) {
      console.log('Approve Error:', error)
    }
  }

  // View Book

  // Table Columns
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

    {
      name: 'Book',
      selector: (row) => row.title,
      sortable: true,
    },

    {
      name: 'Author',
      selector: (row) =>
        `${row.authorId?.firstName || ''} ${row.authorId?.lastName || ''}`,
    },

    {
      name: 'Category',
      selector: (row) => row.category,
    },

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

    { name: 'Actions', selector: (row) => row.actions },
  ]

  const handlePageChange = (page) => {
    setPages(page)
  }

  const handleLimitPerPageChange = (newLimit) => {
    setLimit(newLimit)
    setPages(1)
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className='p-3'>
      <h1 className='text-2xl mb-3'>Authors Book Request</h1>

      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={limit}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitPerPageChange}
        highlightOnHover
        responsive
      />
    </div>
  )
}

export default AuthorInfo

import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { FiEye, FiCheck, FiX, FiTrash2 } from 'react-icons/fi'
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'

const AuthorBooks = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [viewModal, setViewModal] = useState(false)

  const [selectedBook, setSelectedBook] = useState(null)

  // =========================================
  // FETCH BOOKS
  // =========================================

  const fetchBooks = async () => {
    try {
      setLoading(true)

      const res = await axiosAuthInstance.get('/book/all-books')

      setBooks(res.data.data || [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  // =========================================
  // APPROVE BOOK
  // =========================================

  const handleApprove = async (id) => {
    try {
      await axiosAuthInstance.put(`/book/update-status/${id}`, {
        status: 'Approved',
        adminNote: 'Book approved successfully',
      })

      fetchBooks()
    } catch (error) {
      console.log(error)
    }
  }
  const handleView = (book) => {
    setSelectedBook(book)
    setViewModal(true)
  }
  // =========================================
  // REJECT BOOK
  // =========================================

  const handleReject = async (id) => {
    try {
      await axiosAuthInstance.put(`/book/update-status/${id}`, {
        status: 'Rejected',
        adminNote: 'Book rejected by admin',
      })

      fetchBooks()
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?',
    )

    if (!confirmDelete) return

    try {
      await axiosAuthInstance.delete(`/book/delete/${id}`)

      fetchBooks()
    } catch (error) {
      console.log(error)
    }
  }

  // =========================================
  // STATUS COLORS
  // =========================================

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

  // =========================================
  // TABLE COLUMNS
  // =========================================

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
      grow: 2,
    },

    {
      name: 'Author',
      selector: (row) =>
        `${row.authorId?.firstName || ''} ${row.authorId?.lastName || ''}`,
      sortable: true,
    },

    {
      name: 'Category',
      selector: (row) => row.category,
      sortable: true,
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

    {
      name: 'PDF',
      cell: (row) => (
        <a
          href={row.pdf}
          target='_blank'
          rel='noreferrer'
          className='text-primary-600 font-medium'
        >
          View PDF
        </a>
      ),
    },

    {
      name: 'Action',

      cell: (row) => (
        <div className='flex items-center gap-2'>
          {/* View */}
          <button
            onClick={() => handleView(row)}
            className='w-9 h-9 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center transition'
            title='View'
          >
            <FiEye size={18} />
          </button>

          {/* Approve */}
          <button
            onClick={() => handleApprove(row._id)}
            className='w-9 h-9 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 flex items-center justify-center transition'
            title='Approve'
          >
            <FiCheck size={18} />
          </button>

          {/* Reject */}
          <button
            onClick={() => handleReject(row._id)}
            className='w-9 h-9 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-600 flex items-center justify-center transition'
            title='Reject'
          >
            <FiX size={18} />
          </button>

          {/* Delete */}
          <button
            onClick={() => handleDelete(row._id)}
            className='w-9 h-9 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition'
            title='Delete'
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ),

      grow: 2,
    },
  ]

  // =========================================
  // FILTERED DATA
  // =========================================

  const filteredBooks = books.filter(
    (item) =>
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className='bg-white p-5 rounded-2xl shadow'>
      {/* Header */}
      <div className='flex justify-between items-center mb-5'>
        <div>
          <h2 className='text-2xl font-bold text-gray-800'>Submitted Books</h2>

          <p className='text-gray-500 text-sm mt-1'>
            Manage submitted books from authors
          </p>
        </div>

        <input
          type='text'
          placeholder='Search books...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary-500'
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredBooks}
        progressPending={loading}
        pagination
        highlightOnHover
        responsive
        striped
        persistTableHead
      />
      {viewModal && selectedBook && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden'>
            {/* Header */}
            <div className='flex items-center justify-between border-b px-6 py-4'>
              <h2 className='text-xl font-bold text-gray-800'>Book Details</h2>

              <button
                onClick={() => setViewModal(false)}
                className='text-gray-500 hover:text-red-500 text-xl'
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Cover */}
              <div>
                <img
                  src={selectedBook.coverImage}
                  alt='cover'
                  className='w-full h-[350px] object-cover rounded-xl border'
                />
              </div>

              {/* Details */}
              <div className='space-y-4'>
                <div>
                  <p className='text-sm text-gray-500'>Book Title</p>

                  <h3 className='text-lg font-semibold text-gray-800'>
                    {selectedBook.title}
                  </h3>
                </div>

                <div>
                  <p className='text-sm text-gray-500'>Author</p>

                  <h3 className='font-medium text-gray-700'>
                    {selectedBook.authorId?.firstName}{' '}
                    {selectedBook.authorId?.lastName}
                  </h3>
                </div>

                <div>
                  <p className='text-sm text-gray-500'>Category</p>

                  <h3 className='font-medium text-gray-700'>
                    {selectedBook.category}
                  </h3>
                </div>

                <div>
                  <p className='text-sm text-gray-500'>Status</p>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedBook.status,
                    )}`}
                  >
                    {selectedBook.status}
                  </span>
                </div>

                <div>
                  <p className='text-sm text-gray-500'>Description</p>

                  <p className='text-gray-700 text-sm leading-6'>
                    {selectedBook.description}
                  </p>
                </div>

                {/* PDF */}
                <div>
                  <a
                    href={selectedBook.pdf}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-block bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm'
                  >
                    View PDF
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuthorBooks

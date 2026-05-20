import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye } from 'react-icons/fi'
import CustomModal from '../../Components/common/CustomModel'
import toast from 'react-hot-toast'
import { FaRegEdit } from 'react-icons/fa'

import { MdDeleteOutline } from 'react-icons/md'

import { FiFileText } from 'react-icons/fi'

import CustomActions from '../../Components/common/CustomActions'

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

const AuthorBookInfo = () => {
  const [data, setData] = useState([])
  const [pages, setPages] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalRows, setTotalRows] = useState(0)

  const [selectedAuthor, setSelectedAuthor] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // =========================================
  // CONTRACT MODAL
  // =========================================

  const [isContractModalOpen, setIsContractModalOpen] = useState(false)

  const [contractData, setContractData] = useState({
    royalty: '',
    duration: '',
    isbn: '',
    paymentTerms: '',
  })
  const handleOpenEditContractModal = (item) => {
    setSelectedAuthor(item)

    setContractData({
      royalty: item.contractDetails?.royalty || '',

      duration: item.contractDetails?.duration || '',

      isbn: item.contractDetails?.isbn || '',

      paymentTerms: item.contractDetails?.paymentTerms || '',
    })

    setIsContractModalOpen(true)
  }
  const handleDeleteContract = async (id) => {
    try {
      const response = await axiosAuthInstance.delete(
        `/book/delete-contract/${id}`,
      )

      if (response.data.success) {
        toast.success('Contract Deleted Successfully')

        fetchData()
      }
    } catch (error) {
      console.log(error)
    }
  }
  // =========================================
  // FETCH DATA
  // =========================================

  const fetchData = async () => {
    try {
      const response = await axiosAuthInstance.get('book/all-books', {
        params: {
          page: pages,
          limit: limit,
          status: 'Approved',
        },
      })

      if (response.data.success) {
        const transformedData = response.data.result.docs.map((item) => ({
          ...item,

          actions: (
            <CustomActions
              options={[
                // VIEW BOOK

                {
                  label: 'View Book',

                  icon: <FiEye />,

                  onClick: () => navigate(`view/${item._id}`),

                  className: 'text-blue-600',
                },

                // GENERATE CONTRACT

                !item.contractGenerated && {
                  label: 'Generate Contract',

                  icon: <FiFileText />,

                  onClick: () => handleOpenContractModal(item),

                  className: 'text-green-600',
                },

                // VIEW CONTRACT

                item.contractGenerated && {
                  label: 'View Contract',

                  icon: <FiEye />,

                  onClick: () => navigate(`/admin/contracts/view/${item._id}`),

                  className: 'text-purple-600',
                },

                // EDIT CONTRACT

                item.contractGenerated && {
                  label: 'Edit Contract',

                  icon: <FaRegEdit />,

                  onClick: () => handleOpenEditContractModal(item),

                  className: 'text-yellow-600',
                },

                // DELETE CONTRACT

                item.contractGenerated && {
                  label: 'Delete Contract',

                  icon: <MdDeleteOutline />,

                  onClick: () => handleDeleteContract(item._id),

                  className: 'text-red-600 border-t border-gray-100',
                },
              ].filter(Boolean)}
            />
          ),
        }))

        setData(transformedData)

        setTotalRows(response.data.result.totalDocs)
      }
    } catch (error) {
      console.log('Error fetching author data:', error)
    }
  }

  // =========================================
  // OPEN/CLOSE CONTRACT MODAL
  // =========================================

  const handleOpenContractModal = (authorItem) => {
    setSelectedAuthor(authorItem)

    setIsContractModalOpen(true)
  }

  const handleCloseContractModal = () => {
    setSelectedAuthor(null)

    setIsContractModalOpen(false)

    setContractData({
      royalty: '',
      duration: '',
      isbn: '',
      paymentTerms: '',
    })
  }

  // =========================================
  // CONTRACT INPUT CHANGE
  // =========================================

  const handleContractChange = (e) => {
    setContractData({
      ...contractData,
      [e.target.name]: e.target.value,
    })
  }

  // =========================================
  // GENERATE CONTRACT
  // =========================================

  const handleGenerateContract = async () => {
    try {
      setIsLoading(true)

      const response = await axiosAuthInstance.put(
        `/book/generate-contract/${selectedAuthor?._id}`,
        {
          royalty: contractData.royalty,

          duration: contractData.duration,

          isbn: contractData.isbn,

          paymentTerms: contractData.paymentTerms,
        },
      )

      if (response.data.success) {
        toast.success('Contract Generated Successfully')

        handleCloseContractModal()

        fetchData()
      }
    } catch (error) {
      console.log(error)

      toast.error('Failed to generate contract')
    } finally {
      setIsLoading(false)
    }
  }

  // =========================================
  // UPDATE STAGE
  // =========================================

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

    {
      name: 'Actions',

      cell: (row) => row.actions,
    },
  ]

  // =========================================
  // PAGINATION
  // =========================================

  const handlePageChange = (newPage) => {
    setPages(newPage)
  }

  const handleLimitPerPageChange = (newLimit) => {
    setLimit(newLimit)

    setPages(1)
  }

  // =========================================
  // USE EFFECT
  // =========================================

  useEffect(() => {
    fetchData()
  }, [pages, limit])

  return (
    <div className='p-3'>
      <h1 className='text-2xl mb-3'>Authors Book</h1>

      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitPerPageChange}
      />

      {/* CONTRACT MODAL */}

      {isContractModalOpen && (
        <CustomModal handleCloseModal={handleCloseContractModal}>
          <div className='p-5 max-h-[80vh] overflow-y-auto'>
            <h2 className='text-2xl font-bold mb-6 text-center'>
              Publishing Agreement Contract
            </h2>

            {/* BOOK INFO */}

            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div>
                <label className='block mb-2 font-medium'>
                  Royalty Percentage
                </label>

                <input
                  type='text'
                  name='royalty'
                  placeholder='10%'
                  value={contractData.royalty}
                  onChange={handleContractChange}
                  className='w-full border rounded-lg px-4 py-2'
                />
              </div>

              <div>
                <label className='block mb-2 font-medium'>
                  Contract Duration
                </label>

                <input
                  type='text'
                  name='duration'
                  placeholder='5 Years'
                  value={contractData.duration}
                  onChange={handleContractChange}
                  className='w-full border rounded-lg px-4 py-2'
                />
              </div>

              <div>
                <label className='block mb-2 font-medium'>ISBN Number</label>

                <input
                  type='text'
                  name='isbn'
                  placeholder='978-XXXX-XXXX'
                  value={contractData.isbn}
                  onChange={handleContractChange}
                  className='w-full border rounded-lg px-4 py-2'
                />
              </div>

              <div>
                <label className='block mb-2 font-medium'>Payment Terms</label>

                <input
                  type='text'
                  name='paymentTerms'
                  placeholder='Monthly'
                  value={contractData.paymentTerms}
                  onChange={handleContractChange}
                  className='w-full border rounded-lg px-4 py-2'
                />
              </div>
            </div>

            {/* CONTRACT CONTENT */}

            <div className='border rounded-xl p-5 bg-gray-50 text-sm leading-7'>
              <h3 className='text-xl font-semibold mb-4 text-center'>
                BOOK PUBLISHING AGREEMENT
              </h3>

              <p>
                This Publishing Agreement is made between{' '}
                <strong>ZCAD Publication</strong> and the author for publishing
                and distribution of the submitted book.
              </p>

              <br />

              <p>
                <strong>Book Title:</strong> {selectedAuthor?.title}
              </p>

              <p>
                <strong>Author Name:</strong>{' '}
                {selectedAuthor?.authorId?.firstName}{' '}
                {selectedAuthor?.authorId?.lastName}
              </p>

              <p>
                <strong>Category:</strong> {selectedAuthor?.category}
              </p>

              <p>
                <strong>ISBN:</strong> {contractData.isbn || '---'}
              </p>

              <br />

              <h4 className='font-semibold text-lg'>Terms & Conditions</h4>

              <ul className='list-disc ml-6 mt-3 space-y-2'>
                <li>
                  The author confirms that the submitted manuscript is original
                  and does not violate copyright laws.
                </li>

                <li>
                  ZCAD Publication will manage editing, proofreading, layout
                  design, printing, binding, and publishing.
                </li>

                <li>
                  The estimated publishing process may take approximately 5 to
                  10 working days depending on review and approval stages.
                </li>

                <li>
                  The author grants publishing and distribution rights to ZCAD
                  Publication during the agreement period.
                </li>

                <li>
                  The author will receive{' '}
                  <strong>{contractData.royalty || '0%'}</strong> royalty based
                  on book sales.
                </li>

                <li>
                  Payment settlement will be made{' '}
                  <strong>{contractData.paymentTerms || 'Monthly'}</strong>.
                </li>

                <li>
                  Contract validity will remain for{' '}
                  <strong>{contractData.duration || '---'}</strong>.
                </li>

                <li>
                  The author can track the complete publishing workflow from the
                  dashboard.
                </li>

                <li>
                  Any copyright/legal dispute will remain the responsibility of
                  the author.
                </li>

                <li>
                  ZCAD Publication reserves the right to reject or pause
                  publishing in case of policy violations.
                </li>
              </ul>

              <br />

              <div className='grid grid-cols-2 gap-10 mt-10'>
                <div>
                  <p className='font-semibold'>Author Signature</p>

                  <div className='border-b mt-10'></div>

                  <p className='mt-2 text-sm'>
                    Name: {selectedAuthor?.authorId?.firstName}{' '}
                    {selectedAuthor?.authorId?.lastName}
                  </p>
                </div>

                <div>
                  <p className='font-semibold'>Publisher Signature</p>

                  <div className='border-b mt-10'></div>

                  <p className='mt-2 text-sm'>ZCAD Publication</p>
                </div>
              </div>
            </div>

            {/* BUTTONS */}

            <div className='flex justify-end gap-3 mt-6'>
              <button
                onClick={handleCloseContractModal}
                className='bg-gray-300 px-5 py-2 rounded-lg'
              >
                Cancel
              </button>

              <button
                onClick={handleGenerateContract}
                className='bg-green-600 text-white px-5 py-2 rounded-lg'
              >
                {isLoading ? 'Generating...' : 'Generate Contract'}
              </button>
            </div>
          </div>
        </CustomModal>
      )}
    </div>
  )
}

export default AuthorBookInfo

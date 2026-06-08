import React, {
  useEffect,
  useState,
} from 'react'

import DataTable from 'react-data-table-component'

import axiosAuthInstance from '../../../../utils/axios/axiosAuthInstance'

const getStatusColor = (
  status,
) => {
  switch (status) {
    case 'Approved':
      return 'bg-green-100 text-green-600'

    case 'Rejected':
      return 'bg-red-100 text-red-600'

    default:
      return 'bg-yellow-100 text-yellow-600'
  }
}

const AdminWithdrawal = () => {
  const [data, setData] =
    useState([])

  const [pages, setPages] =
    useState(1)

  const [limit, setLimit] =
    useState(10)

  const [totalRows, setTotalRows] =
    useState(0)

  // =====================================
  // FETCH
  // =====================================

  const fetchData =
    async () => {
      try {
        const response =
          await axiosAuthInstance.get(
            'wallet/get-Withdrawal',
          )

        if (
          response.data.success
        ) {
          const transformedData =
            response.data.withdrawals.map(
              (item) => ({
                ...item,

                actions: (
                  <div className='flex gap-2'>
                    {item.status ===
                      'Pending' && (
                        <>
                          <button
                            onClick={() =>
                              handleApprove(
                                item._id,
                              )
                            }
                            className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg'
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleReject(
                                item._id,
                              )
                            }
                            className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg'
                          >
                            Reject
                          </button>
                        </>
                      )}
                  </div>
                ),
              }),
            )

          setData(
            transformedData,
          )

          setTotalRows(
            transformedData.length,
          )
        }
      } catch (error) {
        console.log(error)
      }
    }

  // =====================================
  // APPROVE
  // =====================================

  const handleApprove =
    async (id) => {
      try {
        await axiosAuthInstance.put(
          `wallet/withdrawal-approve/${id}`,
        )

        fetchData()
      } catch (error) {
        console.log(error)
      }
    }

  // =====================================
  // REJECT
  // =====================================

  const handleReject =
    async (id) => {
      try {
        await axiosAuthInstance.put(
          `wallet/withdrawal-reject/${id}`,
        )

        fetchData()
      } catch (error) {
        console.log(error)
      }
    }

  const columns = [
    {
      name: 'Author',
      selector: (
        row,
      ) =>
        `${row.authorId?.firstName || ''} ${row.authorId
          ?.lastName || ''
        }`,
      sortable: true,
    },

    {
      name: 'Email',
      selector: (
        row,
      ) =>
        row.authorId
          ?.email || '-',
    },

    {
      name: 'Amount',
      cell: (row) => (
        <span className='font-semibold text-green-600'>
          ₹{row.amount}
        </span>
      ),
    },

    {
      name: 'Bank Name',
      selector: (
        row,
      ) =>
        row.paymentSetting
          ?.bankName || '-',
    },

    {
      name: 'Account No',
      selector: (
        row,
      ) =>
        row.paymentSetting
          ?.accountNumber ||
        '-',
    },

    {
      name: 'IFSC',
      selector: (
        row,
      ) =>
        row.paymentSetting
          ?.ifscCode || '-',
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
      name: 'Actions',
      selector: (
        row,
      ) => row.actions,
    },
  ]

  const handlePageChange = (
    page,
  ) => {
    setPages(page)
  }

  const handleLimitPerPageChange =
    (newLimit) => {
      setLimit(newLimit)
      setPages(1)
    }

  useEffect(() => {
    fetchData()
  }, [pages, limit])

  return (
    <div className='p-3'>
      <h1 className='text-2xl mb-3'>
        Withdrawal Requests
      </h1>

      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationServer={false}
        paginationTotalRows={
          totalRows
        }
        paginationPerPage={
          limit
        }
        onChangePage={
          handlePageChange
        }
        onChangeRowsPerPage={
          handleLimitPerPageChange
        }
        highlightOnHover
        responsive
      />
    </div>
  )
}

export default AdminWithdrawal
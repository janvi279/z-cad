import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { FiMoreHorizontal } from 'react-icons/fi'
import { MdOutlineCurrencyRupee } from 'react-icons/md'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import Modal from 'react-modal'
import { useLoading } from '../../Context/LoadingContext'
import { useNavigate } from 'react-router-dom'

Modal.setAppElement('#root')

const WithdrawalModal = ({ isOpen, onRequestClose, transactions }) => {
  const totalAmount = transactions.reduce(
    (sum, tx) => sum + parseFloat(tx?.amount || 0),
    0,
  )

  const totalCharges = transactions.reduce(
    (sum, tx) => sum + parseFloat(tx?.charges || 0),
    0,
  )

  const netAmount = totalAmount - totalCharges

  const downloadReceiptAsPDF = () => {
    const doc = new jsPDF()

    doc.text('Withdrawal Receipt', 14, 10)

    autoTable(doc, {
      startY: 20,

      head: [['Invoice ID', 'Order ID', 'Amount', 'Gateway', 'Date']],

      body: transactions.map((txn) => [
        txn.invoiceId || '-',
        txn.orderId || '-',
        `₹${txn.amount || 0}`,
        txn.payment || '-',
        txn.date
          ? new Date(txn.date).toLocaleDateString('en-IN')
          : '-',
      ]),
    })

    const finalY = doc.lastAutoTable.finalY || 30

    doc.text(`Total Transactions : ${transactions.length}`, 14, finalY + 10)

    doc.text(`Total Amount : ₹${totalAmount.toFixed(2)}`, 14, finalY + 18)

    doc.text(`Total Charges : ₹${totalCharges.toFixed(2)}`, 14, finalY + 26)

    doc.text(`Net Amount : ₹${netAmount.toFixed(2)}`, 14, finalY + 34)

    doc.save('withdrawal_receipt.pdf')
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className='bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-10 outline-none'
      overlayClassName='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'
    >
      <h2 className='text-xl font-semibold text-primary-600 mb-4'>
        Withdrawal Summary
      </h2>

      {/* HEADER */}

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-5'>
        <div className='border rounded-lg p-3'>
          <p className='text-gray-500 text-sm'>Total Transactions</p>

          <p className='text-xl font-bold text-primary-600'>
            {transactions.length}
          </p>
        </div>

        <div className='border rounded-lg p-3'>
          <p className='text-gray-500 text-sm'>Total Amount</p>

          <p className='text-xl font-bold text-green-600'>
            ₹{totalAmount.toFixed(2)}
          </p>
        </div>

        <div className='border rounded-lg p-3'>
          <p className='text-gray-500 text-sm'>Charges</p>

          <p className='text-xl font-bold text-red-600'>
            ₹{totalCharges.toFixed(2)}
          </p>
        </div>

        <div className='border rounded-lg p-3'>
          <p className='text-gray-500 text-sm'>Net Amount</p>

          <p className='text-xl font-bold text-blue-600'>
            ₹{netAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* TRANSACTION TABLE */}

      <div className='max-h-80 overflow-y-auto border rounded-lg'>
        <table className='w-full text-sm'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='p-2 text-left'>Invoice</th>

              <th className='p-2 text-left'>Order</th>

              <th className='p-2 text-left'>Amount</th>

              <th className='p-2 text-left'>Gateway</th>

              <th className='p-2 text-left'>Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} className='border-b'>
                <td className='p-2'>{txn.invoiceId}</td>

                <td className='p-2'>{txn.orderId}</td>

                <td className='p-2 text-green-600'>₹{txn.amount}</td>

                <td className='p-2'>{txn.payment}</td>

                <td className='p-2'>{txn.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-end gap-3 mt-5'>
        <button
          onClick={onRequestClose}
          className='px-4 py-2 bg-gray-300 rounded'
        >
          Close
        </button>

        <button
          onClick={downloadReceiptAsPDF}
          className='px-4 py-2 bg-primary-500 text-white rounded'
        >
          Download Receipt
        </button>
      </div>
    </Modal>
  )
}

const Payments = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pages, setPages] = useState(1)
  const [limit, setLimit] = useState(10)
  const [dateRange, setDateRange] = useState([null, null])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setLoading } = useLoading()
  const [startDate, endDate] = dateRange

  const openWithdrawalModal = () => setIsModalOpen(true)
  const closeWithdrawalModal = () => setIsModalOpen(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axiosAuthInstance.get('shopify/transactions')

        if (response?.status === 200) {
          const transformed = response.data.transactions.map((item) => ({
            ...item,
          }))
          setData(transformed)
        }
      } catch (error) {
        console.log('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredData = data.filter((item) => {
    const matchesSearch = Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase()),
    )
    const matchesDate =
      (!startDate && !endDate) ||
      (item.date &&
        new Date(item.date) >= startDate &&
        new Date(item.date) <= endDate)
    return matchesSearch && matchesDate && item.kind === 'sale' // Filter for kind 'sale'
  })
  const totalAmount = filteredData.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  )

  const totalCharges = filteredData.reduce(
    (sum, item) => sum + Number(item.charges || 0),
    0,
  )

  const netAmount = totalAmount - totalCharges
  const handleExport = (type) => {
    const exportData = filteredData.map((item) => ({
      Status: item.status,
      InvoiceId: item.invoiceId?.toString() || '-',
      OrderId: item?.orderId || '-',
      Amount: item?.amount?.toString() || '-',
      Charges: item?.charges?.toString() || '-',
      Payment: item.payment || '-',
      Mode: item.mode || '-',
      Date: item.date ? new Date(item.date).toLocaleDateString('en-IN') : 'N/A',
    }))

    if (type === 'PDF') {
      const doc = new jsPDF()
      doc.text('Transaction Report', 14, 10)
      autoTable(doc, {
        startY: 20,
        head: [Object.keys(exportData[0])],
        body: exportData.map(Object.values),
      })
      doc.save('transactions.pdf')
    }

    if (type === 'EXCEL') {
      const ws = XLSX.utils.json_to_sheet(exportData)
      ws['!cols'] = [
        { wch: 15 },
        { wch: 20 },
        { wch: 20 },
        { wch: 15 },
        { wch: 15 },
        { wch: 20 },
        { wch: 20 },
        { wch: 30 },
        { wch: 18 },
      ]
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Transactions')
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      saveAs(blob, 'transactions.xlsx')
    }

    if (type === 'CSV') {
      const ws = XLSX.utils.json_to_sheet(exportData)
      const csv = XLSX.utils.sheet_to_csv(ws)
      saveAs(new Blob([csv], { type: 'text/csv' }), 'transactions.csv')
    }

    if (type === 'PRINT') {
      const tableHeaders = [
        'Status',
        'Invoice Id',
        'Order Id',
        'Amount',
        'Charges',
        'Payment',
        'Mode',
        'Date',
      ]
      const tableRows = exportData
        .map(
          (row) => `
        <tr>${Object.values(row)
          .map((cell) => `<td>${cell}</td>`)
          .join('')}</tr>
      `,
        )
        .join('')

      const printableContent = `
        <html>
          <head><title>Transaction Report</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 30px; }
              h2 { text-align: center; font-size: 22px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #000; padding: 8px; text-align: left; font-size: 13px; }
              th { background-color: #f0f0f0; }
            </style>
          </head>
          <body>
            <h2>Transaction Report</h2>
            <table><thead><tr>${tableHeaders.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody>${tableRows}</tbody></table>
          </body>
        </html>`

      const printWindow = window.open('', '_blank')
      printWindow.document.write(printableContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const currentMonth = new Date().toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  })

  const columns = [
    {
      name: 'Invoice Id',
      selector: (row) => row.invoiceId || '-',
      sortable: true,
    },

    {
      name: 'Order Id',
      selector: (row) => row.orderId,
    },

    {
      name: 'Amount',
      cell: (row) => (
        <span className='font-semibold text-green-600'>₹{row.amount}</span>
      ),
    },

    {
      name: 'Charges',
      cell: (row) => <span className='text-red-600'>₹{row.charges || 0}</span>,
    },

    {
      name: 'Gateway',
      selector: (row) => row.payment || '-',
    },

    {
      name: 'Mode',
      selector: (row) => row.mode || '-',
    },

    {
      name: 'Status',
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.status === 'success'
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {row.status}
        </span>
      ),
    },

    {
      name: 'Date',
      selector: (row) =>
        row.date
          ? new Date(row.date).toLocaleDateString('en-IN')
          : '-',
    },
  ]

  return (
    <>
      <div className='bg-white shadow rounded-lg text-primary-500 text-xl py-2 px-4 flex justify-between items-center mb-6'>
        Transactions For: {currentMonth}
        <div className='relative group flex items-center gap-5 cursor-pointer'>
          <button
            onClick={openWithdrawalModal}
            className='bg-primary-500 text-white px-3 py-1.5 rounded-lg hover:bg-primary-600 flex items-center gap-1'
          >
            <MdOutlineCurrencyRupee className='w-4 h-4' />
            <span className='text-sm'>Reciept</span>
          </button>
          <button
            onClick={openWithdrawalModal}
            className='bg-primary-500 text-white px-3 py-1.5 rounded-lg hover:bg-primary-600 flex items-center gap-1'
          >
            <MdOutlineCurrencyRupee className='w-4 h-4' />
            <span
              onClick={() => navigate('/withdrawal-request')}
              className='text-sm'
            >
              Withdrawal Request
            </span>
          </button>
        </div>
      </div>

      <div className='bg-white shadow p-4 rounded-lg'>
        <div className='flex flex-wrap gap-4 items-center mb-4'>
          {['PRINT', 'PDF', 'EXCEL', 'CSV'].map((type) => (
            <button
              key={type}
              onClick={() => handleExport(type)}
              className='bg-primary-500 text-white py-2 px-4 rounded'
            >
              {type}
            </button>
          ))}

          <DatePicker
            selected={startDate}
            onChange={(update) => setDateRange(update)}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            isClearable
            placeholderText='Choose Date Range'
            className='px-4 py-2 text-sm border rounded-md text-gray-600'
          />

          <input
            type='text'
            placeholder='Search...'
            className='border p-2 rounded-lg ml-auto'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-5'>
          <div className='bg-white border rounded-xl p-4 shadow'>
            <h3 className='text-sm text-gray-500'>Total Transactions</h3>

            <p className='text-2xl font-bold text-primary-600'>
              {filteredData.length}
            </p>
          </div>

          <div className='bg-white border rounded-xl p-4 shadow'>
            <h3 className='text-sm text-gray-500'>Total Amount</h3>

            <p className='text-2xl font-bold text-green-600'>
              ₹{totalAmount.toFixed(2)}
            </p>
          </div>

          <div className='bg-white border rounded-xl p-4 shadow'>
            <h3 className='text-sm text-gray-500'>Total Charges</h3>

            <p className='text-2xl font-bold text-red-600'>
              ₹{totalCharges.toFixed(2)}
            </p>
          </div>

          <div className='bg-white border rounded-xl p-4 shadow'>
            <h3 className='text-sm text-gray-500'>Net Amount</h3>

            <p className='text-2xl font-bold text-blue-600'>
              ₹{netAmount.toFixed(2)}
            </p>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredData.slice((pages - 1) * limit, pages * limit)}
          pagination
          paginationServer
          paginationTotalRows={filteredData.length}
          paginationPerPage={limit}
          onChangePage={setPages}
          onChangeRowsPerPage={setLimit}
        />
      </div>

      <WithdrawalModal
        isOpen={isModalOpen}
        onRequestClose={closeWithdrawalModal}
        transactions={filteredData}
      />
    </>
  )
}

export default Payments

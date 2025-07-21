import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { FiMoreHorizontal } from 'react-icons/fi'
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const columns = [
  {
    name: <FiMoreHorizontal title='Status' className='h-5 w-5' />,
    selector: (row) => `${row.transactions?.[0]?.status ?? ''}`,
  },
  { name: 'Request Id', selector: (row) => row.id },
  { name: 'Order Id', selector: (row) => row.order_id },
  {
    name: 'Amount',
    selector: (row) => `${row.transactions?.[0]?.amount ?? ''}`,
  },
  {
    name: 'Type',
    selector: (row) => `${row.transactions?.[0]?.kind ?? ''}`,
  },
  {
    name: 'Reason',
    selector: (row) => `${row.order_adjustments?.[0]?.reason ?? ''}`,
  },
  {
    name: 'Date',
    selector: (row) =>
      row.created_at
        ? new Date(row.created_at).toLocaleDateString('en-IN')
        : 'N/A',
  },
]

const Refund = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pages, setPages] = useState(1)
  const [limit, setLimit] = useState(10)

  const fetchData = async () => {
    try {
      const response = await axiosAuthInstance.get('shopify/refund')
      if (response && response.status === 200) {
        const transformedData = response.data.refunds.map((item) => ({
          ...item,
        }))
        setData(transformedData)
        setFilteredData(transformedData)
      }
    } catch (error) {
      console.log('error :>> ', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      const filtered = data.filter(
        (item) =>
          item.id?.toString().toLowerCase().includes(term) ||
          item.order_id?.toString().toLowerCase().includes(term) ||
          item.transactions?.[0]?.status?.toLowerCase().includes(term) ||
          item.transactions?.[0]?.kind?.toLowerCase().includes(term) ||
          item.order_adjustments?.[0]?.reason?.toLowerCase().includes(term)
      )
      setFilteredData(filtered)
    } else {
      setFilteredData(data)
    }
  }, [searchTerm, data])

  // ----------------------------
  // Export and Print Functions
  // ----------------------------

  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.text('Refund Requests', 14, 10)

    autoTable(doc, {
      startY: 20,
      head: [['Status', 'Request Id', 'Order Id', 'Amount', 'Type', 'Reason', 'Date']],
      body: filteredData.map((item) => [
        item.transactions?.[0]?.status || '-',
        item.id,
        item.order_id,
        item.transactions?.[0]?.amount || '-',
        item.transactions?.[0]?.kind || '-',
        item.order_adjustments?.[0]?.reason || '-',
        item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN') : 'N/A',
      ]),
    })

    doc.save('refund_requests.pdf')
  }

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredData.map((item) => ({
        Status: item.transactions?.[0]?.status || '-',
        RequestId: item.id?.toString() || '-',
        OrderId: item.order_id?.toString() || '-',
        Amount: item.transactions?.[0]?.amount || '-',
        Type: item.transactions?.[0]?.kind || '-',
        Reason: item.order_adjustments?.[0]?.reason || '-',
        Date: item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN') : 'N/A',
      }))
    )
    const wb = XLSX.utils.book_new()
     const columnWidths = [{ wch: 10}, { wch: 20 }, { wch:20}, { wch: 10 },{ wch: 10},{ wch: 30},{ wch: 15 }]
    ws['!cols'] = columnWidths
    XLSX.utils.book_append_sheet(wb, ws, 'Refunds')
    saveAs(new Blob([XLSX.write(wb, { type: 'array', bookType: 'xlsx' })]), 'refund_requests.xlsx')
  }

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredData.map((item) => ({
        Status: item.transactions?.[0]?.status || '-',
        RequestId: item.id?.toString() || '-',
        OrderId: item.order_id?.toString() || '-',
        Amount: item.transactions?.[0]?.amount || '-',
        Type: item.transactions?.[0]?.kind || '-',
        Reason: item.order_adjustments?.[0]?.reason || '-',
        Date: item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN') : 'N/A',
      }))
    )
    const csv = XLSX.utils.sheet_to_csv(ws)
    saveAs(new Blob([csv], { type: 'text/csv' }), 'refund_requests.csv')
  }

  const printData = () => {
    const tableHeaders = ['Status', 'Request Id', 'Order Id', 'Amount', 'Type', 'Reason', 'Date']
    const tableRows = filteredData
      .map((item) => {
        return `
        <tr>
          <td>${item.transactions?.[0]?.status || '-'}</td>
          <td>${item.id}</td>
          <td>${item.order_id}</td>
          <td>${item.transactions?.[0]?.amount || '-'}</td>
          <td>${item.transactions?.[0]?.kind || '-'}</td>
          <td>${item.order_adjustments?.[0]?.reason || '-'}</td>
          <td>${item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN') : 'N/A'}</td>
        </tr>`
      })
      .join('')

    const printableContent = `
      <html>
        <head>
          <title>Refund Requests</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <h2>Refund Requests</h2>
          <table>
            <thead><tr>${tableHeaders.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
        </body>
      </html>
    `

    const win = window.open('', '')
    win.document.write(printableContent)
    win.document.close()
    win.print()
  }

  const handleExport = (type) => {
    switch (type) {
      case 'PRINT':
        printData()
        break
      case 'PDF':
        exportToPDF()
        break
      case 'EXCEL':
        exportToExcel()
        break
      case 'CSV':
        exportToCSV()
        break
      default:
        break
    }
  }

  return (
    <>
      <div className='bg-white text-primary-500 rounded-lg shadow text-xl py-2 px-4 flex justify-between items-center mb-6'>
        Refund Requests
      </div>

      <div className='bg-white shadow p-4 rounded-lg'>
        <div className='flex flex-wrap gap-2 justify-between items-center mb-4'>
          {['PRINT', 'PDF', 'EXCEL', 'CSV'].map((type) => (
            <button
              key={type}
              className='bg-primary-500 text-white py-2 px-4 rounded'
              onClick={() => handleExport(type)}
            >
              {type}
            </button>
          ))}

          <input
            type='text'
            placeholder='Search...'
            className='border p-2 rounded-lg ml-auto'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredData.slice((pages - 1) * limit, pages * limit)}
          pagination
          paginationServer
          paginationTotalRows={filteredData.length}
          paginationPerPage={limit}
          onChangePage={(page) => setPages(page)}
          onChangeRowsPerPage={(perPage) => {
            setLimit(perPage)
            setPages(1)
          }}
        />
      </div>
    </>
  )
}

export default Refund

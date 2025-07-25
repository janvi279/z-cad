import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { FiMoreHorizontal } from 'react-icons/fi'
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { useLoading } from '../../Context/LoadingContext'

const columns = [
  {
    name: <FiMoreHorizontal title="Status" className="h-5 w-5" />,
    selector: (row) => row.transactions[0]?.status ?? '',
  },
  { name: 'Request Id', selector: (row) => row.refundId },
  { name: 'Order Id', selector: (row) => row.orderId },
  {
    name: 'Amount',
    selector: (row) => row.transactions?.[0]?.amount ?? '',
  },
  {
    name: 'Type',
    selector: (row) => row.transactions?.[0]?.kind ?? '',
  },
  {
    name: 'Reason',
    selector: (row) => row.orderAdjustments?.[0]?.reason ?? '',
  },
  {
    name: 'Date',
    selector: (row) =>
      row.createdAtShopify
        ? new Date(row.createdAtShopify).toLocaleDateString('en-IN')
        : 'N/A',
  },
];


const Refund = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pages, setPages] = useState(1)
  const [limit, setLimit] = useState(10)
  const { setLoading } = useLoading();

  const fetchData = async () => {
    setLoading(true)
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
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      const filtered = data.filter((item) => {
        const tx = item.transactions?.[0];
        const reason = item.orderAdjustments?.[0]?.reason || '';

        return (
          item.refundId?.toString().toLowerCase().includes(term) ||
          item.orderId?.toString().toLowerCase().includes(term) ||
          tx?.status?.toLowerCase().includes(term) ||
          tx?.kind?.toLowerCase().includes(term) ||
          reason.toLowerCase().includes(term)
        );
      });


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
    const columnWidths = [{ wch: 10 }, { wch: 20 }, { wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 30 }, { wch: 15 }]
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

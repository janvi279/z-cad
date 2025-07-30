import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { useLoading } from '../../../Context/LoadingContext'

const columns = [
  {
    name: 'Product',
    selector: (row) => row.product || '-',
  },
  {
    name: 'Parent',
    selector: (row) => row.parent || '-',
  },
  {
    name: 'Unit In Stock',
    selector: (row) => row.unitInStock?.toString() || '0',
  },
  {
    name: 'Stock Status',
    selector: (row) => row.stockStatus || '-',
  },
]

const OutOfTheStock = () => {
  const [data, setData] = useState([])
  const [pages, setPages] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalRows, setTotalRows] = useState(0)
  const { setLoading } = useLoading()

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axiosAuthInstance.get('shopify/outOfStock')
      if (response?.status === 200) {
        const products = response.data?.products || []

        const outOfStockItems = products.map((item) => ({
          product: item.title,
          parent: item.parent || '-',
          unitInStock: item.unitInStock ?? '0',
          stockStatus: item.stockStatus || 'Out of Stock',
        }))

        setTotalRows(outOfStockItems.length)
        const startIndex = (pages - 1) * limit
        setData(outOfStockItems.slice(startIndex, startIndex + limit))
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pages, limit])

  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(12)
    doc.text('Out Of Stock Products', 14, 10)

    autoTable(doc, {
      startY: 20,
      head: [['Product', 'Parent', 'Unit In Stock', 'Stock Status']],
      body: data.map((item) => [
        item.product || '-',
        item.parent || '-',
        item.unitInStock?.toString() || '0',
        item.stockStatus || '-',
      ]),
    })

    doc.save('out_of_stock.pdf')
  }

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    ws['!cols'] = [
      { wch: 50 },
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
    ]
    XLSX.utils.book_append_sheet(wb, ws, 'OutOfStock')
    const excelBuffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' })
    saveAs(new Blob([excelBuffer]), 'out_of_stock.xlsx')
  }

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(data)
    const csv = XLSX.utils.sheet_to_csv(ws)
    saveAs(new Blob([csv], { type: 'text/csv' }), 'out_of_stock.csv')
  }

  const printData = () => {
    const tableHeaders = ['Product', 'Parent', 'Unit In Stock', 'Stock Status']
    const tableRows = data.map((item) => `
      <tr>
        <td>${item.product || '-'}</td>
        <td>${item.parent || '-'}</td>
        <td>${item.unitInStock ?? '0'}</td>
        <td>${item.stockStatus || '-'}</td>
      </tr>
    `).join('')

    const printableContent = `
      <html>
        <head>
          <title>Print</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f0f0f0; font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>Out Of Stock Products</h2>
          <table>
            <thead>
              <tr>${tableHeaders.map(h => `<th>${h}</th>`).join('')}</tr>
            </thead>
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

  const handlePageChange = (page) => {
    setPages(page)
  }

  const handleLimitPerPageChange = (newLimit) => {
    setLimit(newLimit)
    setPages(1)
  }

  return (
    <div>
      <div className="bg-white shadow rounded-lg text-primary-500 text-xl py-2 px-4 flex justify-between items-center mb-6">
        Out Of Stock
      </div>

      <div className="mt-4 mb-4 flex gap-4">
        {['PRINT', 'PDF', 'EXCEL', 'CSV'].map((type) => (
          <button
            key={type}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            onClick={() => handleExport(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={limit}
        paginationRowsPerPageOptions={[5, 25, 50, 100]}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitPerPageChange}
      />
    </div>
  )
}

export default OutOfTheStock

import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { FiEye } from 'react-icons/fi'
import { CiSaveDown2 } from 'react-icons/ci'
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'
import { Link } from 'react-router-dom'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const columns = [
  { name: 'Title', selector: (row) => row.title },
  { name: 'SKU', selector: (row) => row.sku },
  { name: 'Status', selector: (row) => row.status },
  { name: 'Price', selector: (row) => row.price },
  {
    name: 'Actions',
    cell: (row) => (
      <div className='flex items-center'>
        <div className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary pointer hover:text-primary-600 text-primary-500'>
          <Link to={`view/${row._id}`}>
            <FiEye className='w-4 h-4' />
          </Link>
        </div>
      </div>
    ),
  },
]

const Products = () => {
  const [data, setData] = useState([])
  const [limit, setLimit] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [nextPageInfo, setNextPageInfo] = useState(null)
  const [prevPageInfo, setPrevPageInfo] = useState(null)
  const [currentPageInfo, setCurrentPageInfo] = useState(null)


const handleExportExcel = () => {
  const exportData = filteredData.map(({ title, sku, status, price }) => ({
    Title: title || '-',
    SKU: sku || '-',
    Status: status || '-',
    Price: price ?? '0',
  }));

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(exportData);

  // Set column widths
  const columnWidths = [
    { wch: 50 }, // Title column wide for long names
    { wch: 20 }, // SKU
    { wch: 15 }, // Status
    { wch: 10 }, // Price
  ];
  worksheet['!cols'] = columnWidths;

  // Create workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

  // Write file
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveAs(blob, 'products_export.xlsx');
};


  const fetchData = async (pageInfo = null) => {
    try {
      let url = `shopify/product?limit=${limit}`
      if (pageInfo) url += `&page_info=${pageInfo}`

      const response = await axiosAuthInstance.get(url)
      const { products, pagination } = response.data

      // const author = JSON.parse(localStorage.getItem('_ur'))
      // const firstName = author?.firstName || ''
      // const lastName = author?.lastName || ''
      // const fullName = `${firstName} ${lastName}`.toLowerCase().trim()
      // console.log("fullname", fullName)

      // ✅ Filter only products that belong to this author
      // const authorProducts = products.filter((product) =>
      //   product.product_type?.toLowerCase().includes(fullName)
      // )

      const transformedData = products.map((item) => {
        const variant = item.variants?.[0] || {}
        return {
          _id: item.id,
          title: item.title,
          sku: variant.sku,
          status: item.status,
          price: variant.price,
        }
      })

      setData(transformedData)


      setNextPageInfo(pagination?.nextPageInfo || null)
      setPrevPageInfo(pagination?.prevPageInfo || null)
    } catch (error) {
      console.error('Error fetching product data', error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [limit])

  const handleNext = () => {
    if (nextPageInfo) {
      setCurrentPageInfo(nextPageInfo)
      fetchData(nextPageInfo)
    }
  }

  const handlePrevious = () => {
    if (prevPageInfo) {
      setCurrentPageInfo(prevPageInfo)
      fetchData(prevPageInfo)
    }
  }

  const handleSearchChange = (e) => setSearchTerm(e.target.value)

  const handleLimitChange = (newPerPage) => {
    setLimit(newPerPage)
    setCurrentPageInfo(null)
    fetchData()
  }

  // 🔍 Filter visible rows by search term (optional)
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      {/* Header Section */}
      <div className='bg-white py-2 px-4 flex justify-between items-center rounded-lg mb-6 shadow'>
        <div className='flex gap-4'>
          {['All', 'Archived', 'Pending', 'Published', 'Draft'].map((btn) => (
            <div
              key={btn}
              className={`border-1 p-2 rounded-lg text-sm text-gray-600 hover:bg-primary-100 ${btn === 'All'
                ? 'bg-primary-100 text-primary-600'
                : 'hover:text-primary-600'
                }`}
            >
              <button>{btn}</button>
            </div>
          ))}
        </div>
        <div className='relative group'>
          <button className='bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 flex items-center justify-center' onClick={handleExportExcel}>
            <CiSaveDown2 className='w-5 h-5' />
          </button>
          <span className='absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            Product Export
          </span>
        </div>
      </div>

      {/* Search + Table Section */}
      <div className='bg-white p-4 shadow rounded-lg'>
        <div className='flex justify-between items-center mb-4'>
          <input
            type='text'
            placeholder='Search...'
            className='border p-2 rounded-lg'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <DataTable columns={columns} data={filteredData} pagination={false} />

        <div className='flex justify-between items-center mt-4'>
          <div className='flex gap-2'>
            <button
              onClick={handlePrevious}
              disabled={!prevPageInfo}
              className='px-4 py-2 bg-gray-400 rounded disabled:opacity-50'
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!nextPageInfo}
              className='px-4 py-2 bg-primary-600 text-white rounded disabled:opacity-50'
            >
              Next
            </button>
          </div>

          <select
            value={limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            className='border p-2 rounded-lg'
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}

export default Products

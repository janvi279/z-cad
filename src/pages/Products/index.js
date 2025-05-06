import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
import { FiBox,FiEye } from 'react-icons/fi'
import { CiImageOn, CiSaveDown2 } from 'react-icons/ci'
import { FaEye } from 'react-icons/fa'
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'
import {Link} from 'react-router-dom'

const columns = [
  {
    name: (
      <>
        <CiImageOn title='Image' className='h-5 w-5' />
      </>
    ),
    selector: (row) => row.image,
  },
  {name: 'Title', selector: (row) => row.title},
  // { name: 'Name', selector: (row) => row.name },
  
  { name: 'SKU', selector: (row) => row.sku },
  { name: 'Status', selector: (row) => row.status },
  // { name: 'Stock', selector: (row) => row.stock },
  { name: 'Price', selector: (row) => row.price },
  // { name: 'Taxonomies', selector: (row) => row.taxonomies },
  // {
  //   name: (
  //     <>
  //       <FiBox title='Type' className='h-5 w-5' />
  //     </>
  //   ),
  //   selector: (row) => row.type,
  // },
  // {
  //   name: (
  //     <>
  //       <FaEye title='View' className='h-5 w-5' />
  //     </>
  //   ),
  //   selector: (row) => row.views,
  // },
  // { name: 'Date', selector: (row) => row.date },
  { name: 'Actions', selector: (row) => row.actions },
]

// const columns = [
//   {name: 'Title', selector: (row) => row.title},
//   {name: 'Handle', selector: (row) => row.handle}
// ]

const categoryOptions = []

const typeOptions = [
  { value: 'allProductType', label: 'All Product Type' },
  { value: 'simpleProduct', label: 'Simple Product' },
  { value: 'downloadable', label: 'Downloadable' },
  { value: 'virtual', label: 'Virtual' },
  { value: 'variableProduct', label: 'Variable Product' },
  { value: 'groupedProduct', label: 'Grouped Product' },
  { value: 'externalAffiliateProduct', label: 'External / Affiliate Product' },
]

const Products = () => {
  const [activeButton, setActiveButton] = useState('All')
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pages, setPages] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalRows, setTotalRows] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedType, setSelectedType] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axiosAuthInstance.get('shopify/product');
      if (response && response.status === 200) {
        const transformedData = response.data.products.map((item) => {
          const variant = item.variants?.[0] || {};
  
          return {
            _id: item._id,
            title: item.title ,
            name: item.name ,
            sku: variant.sku,
            status: item.status,
            price: variant.price,
            image: (
              <img
                src={variant.image || '/placeholder.png'}
                alt='Product'
                className='w-10 h-10 object-cover rounded'
              />
            ),
            actions: (
              <div className='flex items-center'>
                <div className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary pointer hover:text-primary-600 text-primary-500'>
                  <Link to={`view/${item._id}`}>
                    <FiEye className='w-4 h-4' />
                  </Link>
                </div>
              </div>
            ),
          };
        });
  
        setData(transformedData);
        // setTotalRows(response.data.result.totalDocs);
      }
    } catch (error) {
      console.error('Error fetching Product data', error);
    }
  };
  

  useEffect(() => {
    fetchData();
  },[])

  const handlePageChange = (page) => setPages(page)

  const handlelimitChange = (newPerPage) => {
    setLimit(newPerPage)
    setPages(1)
  }
  const handleSearchChange = (e) => setSearchTerm(e.target.value)
  return (
    <>
      {/* Button Section */}
      <div className='bg-white py-2 px-4 flex justify-between items-center rounded-lg mb-6 shadow'>
        <div className='flex gap-4'>
          {['All', 'Archived', 'Pending', 'Published', 'Draft'].map((btn) => (
            <div
              key={btn}
              className={`border-1 p-2 rounded-lg text-sm text-gray-600 hover:bg-primary-100 ${activeButton === btn
                ? 'bg-primary-100 text-primary-600'
                : 'hover:text-primary-600'
                }`}
              onClick={() => setActiveButton(btn)}
            >
              <button>{btn.charAt(0).toUpperCase() + btn.slice(1)}</button>
            </div>
          ))}
        </div>
        <div className='relative group'>
          <button className='bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 flex items-center justify-center'>
            <CiSaveDown2 className='w-5 h-5' />
          </button>

          <span className='absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            Product Export
          </span>
        </div>
      </div>

      <div className='bg-white p-4 shadow rounded-lg'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex gap-4'>
            <Select
              options={categoryOptions}
              placeholder='Filter By Category'
              value={selectedCategory}
              onChange={setSelectedCategory}
            />
            <Select
              options={typeOptions}
              placeholder='All Product Type'
              value={selectedType}
              onChange={setSelectedType}
            />
          </div>
          <input
            type='text'
            placeholder='Search...'
            className='border p-2 rounded-lg'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <DataTable
          columns={columns}
          data={data  }
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationPerPage={limit}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlelimitChange}
        />
      </div>
    </>
  )
}

export default Products

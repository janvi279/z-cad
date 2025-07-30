import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FiMoreHorizontal } from 'react-icons/fi';
import { CiImageOn } from 'react-icons/ci';
import { FiBox } from 'react-icons/fi';
import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance';

const columns = [
  {
    name: (
      <>
        <FiMoreHorizontal title='Status' className='h-5 w-5' />
      </>
    ),
    selector: (row) => row.status,
  },
  {
    name: (
      <>
        <CiImageOn title='Image' className='h-5 w-5' />
      </>
    ),
    selector: (row) => row.image,
  },
  { name: 'Author', selector: (row) => row.reviewer.name },
  { name: 'Comment', selector: (row) => row.body },
  { name: 'Date', selector: (row) => new Date(row.created_at).toLocaleDateString() },
];

const Reviews = () => {
  const [activeButton, setActiveButton] = useState('All');
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axiosAuthInstance.get('shopify/review', {
        params: {
          page: pages,
          per_page: limit,
        },
      });
      if (response && response.status === 200) {
        setData(response.data);
        setTotalRows(response.data.length); // Update total rows based on the response
      }
    } catch (error) {
      console.error('Error Fetching Review data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pages, limit]); // Fetch data when pages or limit changes

  const handlePageChange = (page) => setPages(page);

  const handleLimitChange = (newPerPage) => {
    setLimit(newPerPage);
    setPages(1); // Reset to first page
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredData = data
    .filter((item) => activeButton === 'All' || item.status === activeButton)
    .filter((item) =>
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );

  return (
    <>
      <div className='bg-white text-primary-500 text-xl py-2 px-4 flex justify-between items-center mb-6 rounded-lg shadow'>
        {/* Filter Buttons */}
        <div className='flex gap-4'>
          {['All', 'Approved', 'Pending'].map((btn) => (
            <button
              key={btn}
              className={`border-1 p-2 rounded-lg text-sm text-gray-600 hover:bg-primary-100 ${activeButton === btn
                ? 'bg-primary-100 text-primary-600'
                : 'hover:text-primary-600'
                }`}
              onClick={() => setActiveButton(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
          
        {/* Product Reviews Button */}
        <div className='relative group'>
          <button className='bg-primary-500 text-white px-3 py-1.5 rounded-lg hover:bg-primary-600 flex items-center gap-1'>
            <FiBox className='w-4 h-4' />
            <span className='text-sm'>Product Reviews</span>
          </button>
          <span className='absolute z-50 top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg'>
            Product Reviews
          </span>
        </div>
      </div>

      {/* DataTable */}
      <div className='bg-white p-4 rounded-lg shadow'>
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationPerPage={limit}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border p-2 rounded"
            />
          }
        />
      </div>
    </>
  );
};

export default Reviews;

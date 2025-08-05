import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { FiBox } from 'react-icons/fi';
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';



const columns = [
  {
    name: 'Rating',
    cell: (row) => renderStars(row.rating)
  },
  {
    name: 'Reviewer',
    selector: (row) => row.reviewer?.name || "N/A",
  },
  {
    name: "Review Title",
    selector: (row) => row.title || "N/A",
  },
  {
    name: 'Comment',
    selector: (row) => row.body,
    wrap: true, // ✅ enables multiline wrapping
    grow: 2     // ✅ optional: makes this column wider
  },
  {
    name: 'Product Title',
    selector: (row) => row.product_title.replace(/\s*\(અંગ્રેજી\)/gi, ''),
    wrap: true, // ✅ enables multiline wrapping
    grow: 2     // ✅ optional: makes this column wider
  },
  {
    name: 'Date',
    selector: (row) => new Date(row.created_at).toLocaleDateString(),
  }
];
;
const renderStars = (rating) => {
  const stars = [];
  const parsedRating = parseFloat(rating) || 0;

  for (let i = 1; i <= 5; i++) {
    if (parsedRating >= i) {
      stars.push(<FaStar key={i} color="#f5c518" />);
    } else if (parsedRating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} color="#f5c518" />);
    } else {
      stars.push(<FaRegStar key={i} color="#f5c518" />);
    }
  }

  return <div style={{ display: 'flex', gap: '2px' }}>{stars}</div>;
};
const Reviews = () => {
  const [activeButton, setActiveButton] = useState('All');
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axiosAuthInstance.get('shopify/review');
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
  const handleExportPdf = () => {
    const doc = new jsPDF()
    doc.text('Product Reviews', 14, 10)

    autoTable(doc, {
      startY: 20,
      head: [['Rating', 'Reviewer', 'Review Tiltle', 'Comment', 'Product Title', 'Date']],
      body: filteredData.map((item) => [
        item.rating || '-',
        item.reviewer?.name,
        item.title,
        item.body || '-',
        item.product_title || '-',
        item.orderAdjustments?.[0]?.reason || '-',
        item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN') : 'N/A',
      ]),
    })

    doc.save('product_reviews.pdf')

  }
  return (
    <>
      <div className='bg-white text-primary-500 text-xl py-2 px-4 flex justify-between items-center mb-6 rounded-lg shadow'>

        Reviews


        {/* Product Reviews Button */}
        <div className='relative group'>
          <button className='bg-primary-500 text-white px-3 py-1.5 rounded-lg hover:bg-primary-600 flex items-center gap-1' onClick={handleExportPdf}>
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
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { CiSaveDown2 } from 'react-icons/ci';
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useLoading } from '../../Context/LoadingContext';

const columns = [
  { name: 'Title', selector: (row) => row.title },
  { name: 'SKU', selector: (row) => row.sku },
  { name: 'Status', selector: (row) => row.status },
  { name: 'Price', selector: (row) => row.price },
];

const statusMap = {
  Published: 'active',
  Draft: 'draft',
  Archived: 'archived',
  All: 'All',
};

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatus, setActiveStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
 const {setLoading}=useLoading();

  const handleExportExcel = () => {
    const exportData = filteredProducts.map(({ title, sku, status, price }) => ({
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

const fetchAllProducts = async () => {
  setLoading(true); // ✅ ADD THIS LINE

  try {
    let all = [];
    let nextPageInfo = null;
    let keepFetching = true;

    while (keepFetching) {
      const url = `shopify/product?limit=250${nextPageInfo ? `&page_info=${nextPageInfo}` : ''}`;
      const response = await axiosAuthInstance.get(url);
      all = [...all, ...response.data.products];
      nextPageInfo = response.data.pagination?.nextPageInfo;
      keepFetching = !!nextPageInfo;
    }

    const transformed = all.map((item) => {
      const variant = item.variants?.[0] || {};
      return {
        _id: item.id,
        title: item.title,
        sku: variant.sku,
        status: item.status,
        price: variant.price,
      };
    });

    setAllProducts(transformed);
    setFilteredProducts(transformed);
  } catch (error) {
    console.error('Error fetching all products:', error.message);
  } finally {
    setLoading(false); // ✅ ALREADY GOOD
  }
};


  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    let filtered = allProducts;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const mappedStatus = statusMap[activeStatus];
    if (mappedStatus !== 'All') {
      filtered = filtered.filter((product) =>
        product.status?.toLowerCase() === mappedStatus
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on filter
  }, [searchTerm, activeStatus, allProducts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const handleStatusFilter = (statusLabel) => {
    setActiveStatus(statusLabel);
  };

  const paginatedData = filteredProducts.slice((currentPage - 1) * limit, currentPage * limit);
  const totalPages = Math.ceil(filteredProducts.length / limit);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      {/* Header Section */}
      <div className='bg-white py-2 px-4 flex justify-between items-center rounded-lg mb-6 shadow'>
        <div className='flex gap-4'>
          {['All', 'Archived', 'Published', 'Draft'].map((btn) => (
            <button
              key={btn}
              onClick={() => handleStatusFilter(btn)}
              className={`border-1 p-2 rounded-lg text-sm ${activeStatus === btn
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-gray-600 hover:bg-primary-100 hover:text-primary-600'
                }`}
            >
              {btn}
            </button>
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

        <DataTable
          columns={columns}
          data={paginatedData}
          pagination={false}
          noDataComponent="No products found"
        />

        <div className='flex justify-between items-center mt-4'>
          <div className='flex gap-2'>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className='px-4 py-2 bg-gray-400 rounded disabled:opacity-50 text-black'
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
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
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Products;

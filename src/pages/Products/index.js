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
   {name:'Unit In Stock',selector:(row)=>row.unitInStock},
  {name:"Product Type",selector:(row)=>row.product_type},
  { name: 'Price', selector: (row) => row.price },
 
];

const statusMap = {
  Published: 'active',
  Draft: 'draft',
  Archived: 'archived',
  All: 'All',
};

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatus, setActiveStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const { setLoading } = useLoading();

  const [showSkuModal, setShowSkuModal] = useState(false);
  const [skuInput, setSkuInput] = useState('');
  const [skuNotFound, setSkuNotFound] = useState(false);
  const data = JSON.parse(localStorage.getItem("_ur") || '{}');
  const authorId = data?._id;

  const handleExportExcel = () => {
    const exportData = filteredProducts.map(({ title, sku, status, price,unitInStock }) => ({
      Title: title || '-',
      SKU: sku || '-',
      Status: status || '-',
      UnitInStock: unitInStock||'-',
      Price: price ?? '0',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    worksheet['!cols'] = [
      { wch: 50 }, { wch: 20 }, { wch: 15 }, { wch: 10 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, 'products_export.xlsx');
  };
  useEffect(() => {
    const fetchAuthorProducts = async () => {
      setLoading(true);


      try {
        const res = await axiosAuthInstance.get(`shopify/product/${authorId}`);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error("Failed to load saved products", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorProducts();
  }, []);
  const handleSkuSearch = async () => {
    if (!skuInput.trim()) return;
    setLoading(true);

    try {
      const res = await axiosAuthInstance.post("shopify/product", {
        sku: skuInput.trim(),
        authorId: authorId
      });
 // ✅ Re-fetch from backend to update full list
    const updatedList = await axiosAuthInstance.get(`shopify/product/${authorId}`);
    setFilteredProducts(updatedList.data);
    
      const productData = {
        title: res.data.title,
        sku: res.data.sku,
        status: res.data.status,
        price: res.data.price,
        unitInStock:res.data.variant.unitInStock,
        product_type:res.data.product_type,
      };

      setFilteredProducts(prev => [...prev, productData]);
      setSkuNotFound(false);
    } catch (err) {
      console.error(err.message);
      setSkuNotFound(true);
    } finally {
      setSkuInput('');
      setShowSkuModal(false);
      setLoading(false);
    }
  };


  const handleStatusFilter = (statusLabel) => {
    setActiveStatus(statusLabel);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(filteredData.length / limit)) setCurrentPage(currentPage + 1);
  };

  const filteredData = filteredProducts.filter(product => {
    const statusMatch = statusMap[activeStatus] === 'All' || product.status === statusMap[activeStatus];
    const searchMatch = product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  const paginatedData = filteredData.slice((currentPage - 1) * limit, currentPage * limit);


  return (
    <>
      {/* Header */}
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
        <div className='flex gap-3'>
          <button
            onClick={() => setShowSkuModal(true)}
            className='bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600'
          >
            Add Product
          </button>
          <button onClick={handleExportExcel} className='bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600'>
            <CiSaveDown2 className='w-5 h-5' />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className='bg-white p-4 shadow rounded-lg'>
        <div className='flex justify-between mb-4'>
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
          noDataComponent="No products matched."
        />

        <div className='flex justify-between mt-4'>
          <div className='flex gap-2'>
            <button onClick={handlePrevious} disabled={currentPage === 1} className='px-4 py-2 bg-gray-400 rounded disabled:opacity-50 text-black'>
              Previous
            </button>
            <button onClick={handleNext} disabled={currentPage >= Math.ceil(filteredData.length / limit)} className='px-4 py-2 bg-primary-600 text-white rounded disabled:opacity-50'>
              Next
            </button>
          </div>
          <select value={limit} onChange={(e) => handleLimitChange(Number(e.target.value))} className='border p-2 rounded-lg'>
            {[10, 25, 50, 100].map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        </div>
      </div>

      {/* SKU Modal */}
      {showSkuModal && (
        <div className='fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white shadow-lg p-6 rounded-lg w-[400px]'>
            <h2 className='text-lg font-semibold mb-4'>Enter SKU</h2>
            <input
              type='text'
              placeholder='Enter SKU'
              className='w-full border p-2 rounded mb-4'
              value={skuInput}
              onChange={(e) => setSkuInput(e.target.value)}
            />
            <div className='flex justify-end gap-2'>
              <button
                onClick={() => {
                  setShowSkuModal(false);
                  setSkuInput('');
                  setSkuNotFound(false);
                }}
                className='bg-gray-300 text-black px-4 py-2 rounded'
              >
                Cancel
              </button>
              <button onClick={handleSkuSearch} className='bg-blue-600 text-white px-4 py-2 rounded'>
                Submit
              </button>
            </div>
            {skuNotFound && (
              <p className='text-red-500 mt-4'>No product found with this SKU.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;

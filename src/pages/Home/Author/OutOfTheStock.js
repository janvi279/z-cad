import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance';

const columns = [
  {
    name: 'Product',
    selector: (row) => row.product,
    sortable: true,
  },
  {
    name: 'Parent',
    selector: (row) => row.parent,
  },
  {
    name: 'Unit In Stock',
    selector: (row) => row.unitInStock,
  },
  {
    name: 'Stock Status',
    selector: (row) => row.stockStatus,
  },
  {
    name: 'Actions',
    cell: () => (
      <button className="px-2 py-1 bg-blue-500 text-white rounded">View</button>
    ),
  },
];

const OutOfTheStock = () => {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const fetchOutOfStockProducts = async () => {
    try {
      const res = await axiosAuthInstance.get('shopify/outOfStock');
      const products = res.data.products || [];

      const outOfStockItems = [];

      products.forEach((product) => {
        product.variants.forEach((variant) => {
          if (variant[0].inventory_quantity <= 0) {
            outOfStockItems.push({
              product: product.title,
              parent: product.product_type || '-',
              unitInStock: variant.inventory_quantity,
              stockStatus: 'Out of Stock',
            });
          }
        });
      });

      setTotalRows(outOfStockItems.length);
      const startIndex = (pages - 1) * limit;
      setData(outOfStockItems.slice(startIndex, startIndex + limit));
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchOutOfStockProducts();
  }, [pages, limit]);

  const handlePageChange = (newPage) => {
    setPages(newPage);
  };

  const handleLimitPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPages(1);
  };

  return (
    <div>
      <div className='flex items-center justify-between border-b px-4 pb-2'>
        <h1 className='text-2xl'>Out Of Stock</h1>
      </div>

      <div className='mt-4 mb-4 flex gap-4'>
        {['PRINT', 'PDF', 'EXCEL', 'CSV'].map((type) => (
          <button
            key={type}
            className='px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600'
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
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitPerPageChange}
      />
    </div>
  );
};

export default OutOfTheStock;

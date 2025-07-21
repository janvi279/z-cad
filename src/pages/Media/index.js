import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';
import { MdOutlineDelete } from "react-icons/md";

const columns = [
  {
    name: 'File',
    selector: row => row.image?.src ?? '',
    cell: row =>
      row.image?.src ? (
        <img
          src={row.image.src}
          alt="product"
          width={50}
          height={50}
          style={{ objectFit: 'contain' ,padding:"3px"}}
        />
      ) : (
        'No image'
      ),
  },
  {
    name: 'Associate',
    selector: (row) => row.vendor || 'N/A',
  },
  {
    name: 'Size',
    selector: (row) => row.variants?.[0]?.option1 || 'N/A',
  },
  {
    name: 'Actions',
    cell: (row) => (
      <div className='flex items-center'>
        <button
          onClick={() => console.log("Delete", row.id)}
          className='text-blue-500 text-lg px-4 py-2 rounded'
        >
          <MdOutlineDelete />
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

const Media = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = async () => {
    try {
      let all = [];
      let nextPageInfo = null;
      let keepFetching = true;

      while (keepFetching) {
        const url = `shopify/product?limit=250${nextPageInfo ? `&page_info=${nextPageInfo}` : ''}`;
        const response = await axiosAuthInstance.get(url);

        if (response?.status === 200) {
          all = [...all, ...response.data.products];
          nextPageInfo = response.data.pagination?.nextPageInfo;
          keepFetching = !!nextPageInfo;
        } else {
          keepFetching = false;
        }
      }

      const transformedData = all.map((item) => ({
        ...item,
        actions: (
          <div className='flex items-center'>
            <button
              onClick={() => console.log("Delete", item.id)}
              className='text-blue-500 text-lg px-4 py-2 rounded'
            >
              <MdOutlineDelete />
            </button>
          </div>
        ),
      }));

      setData(transformedData);
      setTotalRows(transformedData.length);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleLimitPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const onSelectRow = (state) => {
    console.log("Selected rows:", state.selectedRows);
  };

  return (
    <div>
      <div className='bg-white shadow rounded-lg text-primary-500 text-xl py-2 px-4 flex justify-between items-center mb-6'>
        <h1 className='text-xl'>Media</h1>
        <button className="px-4 py-2 text-sm bg-primary-500 text-white rounded-md flex items-center gap-2">
          Bulk Delete
        </button>
      </div>

      <DataTable
        columns={columns}
        data={data.slice((currentPage - 1) * limit, currentPage * limit)}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={limit}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitPerPageChange}
        selectableRows
        onSelectedRowsChange={onSelectRow}
        highlightOnHover
        responsive
      />
    </div>
  );
};

export default Media;

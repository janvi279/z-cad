import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

const columns = [
  { name: 'First Name', selector: (row) => row.firstName },
  { name: 'Last Name', selector: (row) => row.lastName },
  { name: 'Email', selector: (row) => row.email },
  { name: 'Mobile No.', selector: (row) => row.phone },
  { name: 'Actions', selector: (row) => row.actions },
];

const AuthorInfo = () => {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axiosAuthInstance.get('author/get-all-author', {
        params: { page: pages, limit: limit },
      });
      if (response && response.status === 200) {
        const transformedData = response.data.result.docs.map((item) => ({
          ...item,
          actions: (
            <div className='flex items-center'>
              <div className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary pointer hover:text-primary-600 text-primary-500'>
                <Link to={`view/${item._id}`}>
                  <FiEye className='w-4 h-4' />
                </Link>
              </div>
            </div>
          ),
        }));
        setData(transformedData);
        setTotalRows(response.data.result.totalDocs);
      }
    } catch (error) {
      console.log('Error fetching author data:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setPages(newPage);
  };

  const handleLimitPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPages(1);
  };

  useEffect(() => {
    fetchData();
  }, [pages, limit]);

  return (
    <div className='p-3'>
      <h1 className="text-2xl mb-3">Authors</h1>
      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitPerPageChange}
      />
    </div>
  );
};

export default AuthorInfo;

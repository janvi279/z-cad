import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';
import CustomModal from '../../Components/common/CustomModel';
import { MdOutlineClose } from 'react-icons/md';
import { FiCheckCircle } from 'react-icons/fi'; 

const columns = [
  {
    name: 'Name',
    selector: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    name: 'Email',
    selector: (row) => row.email,
  },
  {
    name: 'Mobile No.',
    selector: (row) => row.phone,
  },
  {
    name: 'Actions',
    selector: (row) => row.actions,
  },
];

const Index = () => {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axiosAuthInstance.get('author/get-all-author', {
        page: pages, limit: limit, status: "1" 
      });
      if (response && response.status === 200) {
        const transformedData = response.data.result.docs.map((item) => ({
          ...item,
          actions: (
            <div className='flex items-center'>
              <button
                onClick={() => handleOpenModal(item._id)}
                className='bg-primary-500 text-white px-4 py-2 rounded'
              >
                Approve
              </button>
            </div>
          ),
        }));
        setData(transformedData);
        setTotalRows(response.data.result.totalDocs);
      }
    } catch (error) {
      console.error('Error fetching author data:', error);
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

  const handleOpenModal = (id) => {
    const authorDetail = data.find((item) => item._id === id);
    setSelectedAuthor(authorDetail);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAuthor(null);
  };

  const handleChangeStatus = async () => {
    setIsLoading(true);
    try {
      const response = await axiosAuthInstance.put(`author/author-request/${selectedAuthor._id}`,{
        status:"2",
      });
      if (response.status === 200) {
        fetchData();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error changing author status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitPerPageChange}
      />

      {isModalOpen && (
        <CustomModal handleCloseModal={handleCloseModal}>
          <div className='p-4 relative'>
            <div
              className='absolute right-5 cursor-pointer hover:opacity-70'
              onClick={handleCloseModal}
            >
              <MdOutlineClose className='text-2xl' />
            </div>
            <div className='flex flex-col items-center justify-between gap-4'>
              <div className='flex flex-wrap justify-center alert-ico'>
                <FiCheckCircle className='text-5xl' />
              </div>
              <h2>Are you sure you want to Approve {
                <span className="font-bold">
                  {selectedAuthor?.firstName} {selectedAuthor?.lastName}
                  </span>
                } ?</h2>
              <div className='flex gap-4 mt-4'>
                <button
                  onClick={handleCloseModal}
                  className='bg-gray-300 px-4 py-2 rounded'
                >
                  No, Cancel
                </button>
                <button
                  onClick={handleChangeStatus}
                  className='bg-blue-500 text-white px-4 py-2 rounded'
                >
                  {isLoading ? (
                    <div className='w-5 h-5 mx-auto border-2 border-white border-solid rounded-full loader animate-spin border-t-transparent' />
                  ) : (
                    'Yes, Approve'
                  )}
                </button>
              </div>
            </div>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default Index;

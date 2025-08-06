import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';
import { useLoading } from '../../Context/LoadingContext';
import { AiOutlineEye } from 'react-icons/ai';

const columns = (handleView) => [
  {
    name: 'File',
    selector: row => row.images?.[0]?.src || 'N/A',
    cell: row => {
      return row.images?.[0]?.src ? (
        <img src={row.images[0].src} alt="product" style={{ padding: '4px' }} width={70} height={70} />
      ) : (
        'No image'
      );
    }
  },
  {
    name: 'Title',
    selector: row => row.title || 'N/A',
  },
  {
    name: 'Associate',
    selector: row => row.images?.[0]?.associate || 'N/A',
  },
  {
    name: 'Size',
    selector: row =>
      row.images?.[0]?.size?.width && row.images?.[0]?.size?.height
        ? `${row.images[0].size.width}x${row.images[0].size.height}`
        : 'N/A',
  },
  {
    name: 'Action',
    cell: (row) => (
      <button
        onClick={() => handleView(row.images?.[0]?.src)}
        className="text-blue-500 hover:text-blue-700"
        title="View Image"
      >
        <AiOutlineEye size={22} />
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  }
];

const Media = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  const { setLoading } = useLoading();

  const fetchData = async () => {
    setLoading(true);
    try {
      let all = [];
      let nextPageInfo = null;
      let keepFetching = true;
      const localData = JSON.parse(localStorage.getItem('_ur') || '{}');
      const authorId = localData?._id;

      while (keepFetching) {
        const url = `/shopify/product/${authorId}?limit=250${nextPageInfo ? `&page_info=${nextPageInfo}` : ''}`;
        const response = await axiosAuthInstance.get(url);

        const products = response?.data;

        if (!Array.isArray(products)) break;

        all = [...all, ...products];

        const linkHeader = response.headers?.link;
        if (linkHeader && linkHeader.includes('rel="next"')) {
          const match = linkHeader.match(/page_info=([^&>]+)/);
          nextPageInfo = match ? match[1] : null;
        } else {
          keepFetching = false;
        }
      }

      setData(all);
      setTotalRows(all.length);
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
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

  const handleView = (src) => {
    if (src) {
      setModalImage(src);
    }
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  return (
    <div>
      <div className='bg-white shadow rounded-lg text-primary-500 text-xl py-2 px-4 flex justify-between items-center mb-6'>
        <h1 className='text-xl'>Media</h1>
      </div>

      <DataTable
        columns={columns(handleView)}
        data={data.slice((currentPage - 1) * limit, currentPage * limit)}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={limit}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitPerPageChange}
        highlightOnHover
        responsive
      />

      {/* Modal for zoom view */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <img
            src={modalImage}
            alt="Zoomed"
            className="max-w-3xl   max-h-[70vh] object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
    </div>
  );
};

export default Media;

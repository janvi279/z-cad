import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';
import { useLoading } from '../../Context/LoadingContext';

const columns = [
  {
    name: 'File',
    selector: row => row.images?.[0]?.src || 'N/A',
    cell: row => {
      return row.images?.[0]?.src ? (
        <img src={row.images[0].src} alt="product" style={{ "padding": "4px" }} width={70} height={70} />
      ) : (
        'No image'
      );
    }
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

];

const Media = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
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

        console.log('Shopify Response:', response.data);

        const products = response?.data;

        if (!Array.isArray(products)) {
          console.error('Expected products to be an array, got:', products);
          break;
        }

        all = [...all, ...products];

        // Handle pagination from Shopify 'link' header
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


  return (
    <div>
      <div className='bg-white shadow rounded-lg text-primary-500 text-xl py-2 px-4 flex justify-between items-center mb-6'>
        <h1 className='text-xl'>Media</h1>
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
        highlightOnHover
        responsive
      />
    </div>
  );
};

export default Media;

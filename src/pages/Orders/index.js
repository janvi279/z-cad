import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import 'react-datepicker/dist/react-datepicker.css';
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';
import { useLoading } from '../../Context/LoadingContext';

const columns = [
  {
    name: 'Customer Name',
    selector: (row) => row.customer_name,
  },
  { name: 'Email', selector: (row) => row.email },
  { name: 'Order Confirm', selector: (row) => (row.orderConfirm ? 'Yes' : 'No') },
  { name: 'Total Price', selector: (row) => row.TotalPrice },
  { name: 'Order No.', selector: (row) => row.orderNo },
];

const Orders = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const { setLoading } = useLoading();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosAuthInstance.get('shopify/order');
      if (response && response.status === 200) {
        const orders = response.data.orders;
        setData(orders);
        setTotalRows(orders.length);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (page) => setPages(page);
  const handleLimitChange = (newPerPage) => {
    setLimit(newPerPage);
    setPages(1);
  };
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredData = data.filter((item) =>
    item.customer_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculation (client-side since no backend pagination)
  const startIndex = (pages - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      <div className='bg-white shadow rounded-lg text-primary-500 text-xl py-2 px-4 flex justify-between items-center mb-6'>
        Orders
      </div>

      <div className='bg-white shadow p-4 rounded-lg'>
        <div className='flex justify-between gap-4 items-center mb-4'>
          <input
            type='text'
            placeholder='Search...'
            className='border p-2 rounded-lg mr-auto'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <DataTable
          columns={columns}
          data={paginatedData}
          pagination
          paginationServer={false}
          paginationTotalRows={filteredData.length}
          paginationPerPage={limit}
          paginationDefaultPage={pages}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
        />
      </div>
    </>
  );
};

export default Orders;

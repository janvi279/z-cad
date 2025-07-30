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
{ name: 'Order No.', selector: (row) => row.orderNo?.replace('#', '') },

];

const Orders = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const { setLoading } = useLoading();

  // Fetch from backend (commented now for dummy)
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosAuthInstance.get('shopify/order');
      if (response?.status === 200) {
        setData(response.data.orders);
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const filteredData = data.filter((item) =>
    item.customer_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (page - 1) * perPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + perPage);

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
          paginationServer={true} // important for manual pagination
          paginationTotalRows={filteredData.length}
          paginationPerPage={perPage}
          paginationDefaultPage={page}
          onChangePage={(newPage) => setPage(newPage)}
          onChangeRowsPerPage={(newPerPage) => {
            setPerPage(newPerPage);
            setPage(1);
          }}
        />
      </div>
    </>
  );
};

export default Orders;

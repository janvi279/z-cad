import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import 'react-datepicker/dist/react-datepicker.css';
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';
import { useLoading } from '../../Context/LoadingContext';

const columns = [
  {
    name: 'Customer Name',
    selector: (row) => `${row.customer?.first_name ?? ''} ${row.customer?.last_name ?? ''}`,
  },
  { name: 'Email', selector: (row) => row.contact_email },
  { name: 'Order Confirm', selector: (row) => (row.confirmed ? 'Yes' : 'No') },
  { name: 'Total Price', selector: (row) => row.current_total_price },
  { name: 'Order No.', selector: (row) => row.order_number },
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
        const transformedData = response.data.orders.map((item) => ({
          ...item,
        }));
        setData(transformedData);
        setTotalRows(transformedData.length); // Set total rows for pagination
      }
    } catch (error) {
      console.log('error :>> ', error);
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

  // Filtered data based on search term
  const filteredData = data.filter((item) => {
    const customerName = `${item.customer?.first_name ?? ''} ${item.customer?.last_name ?? ''}`.toLowerCase();
    return customerName.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      {/* Button Section */}
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
          data={filteredData}
          pagination
          paginationServer
          paginationTotalRows={filteredData.length} // Update total rows based on filtered data
          paginationPerPage={limit}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
        />
      </div>
    </>
  );
};

export default Orders;

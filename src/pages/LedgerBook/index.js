import { useState, useEffect } from 'react';
import { LuRepeat2 } from 'react-icons/lu';
import { PiMoney } from 'react-icons/pi';
import DataTable from 'react-data-table-component';
import { FiMoreHorizontal } from 'react-icons/fi';
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';
import { useLoading } from '../../Context/LoadingContext';

const LedgerBook = () => {

  const [data, setData] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [totalRefunds, setTotalRefunds] = useState(0);
  const {setLoading}=useLoading();
  

  const columns = [
    {
      name: <FiMoreHorizontal title="Status" className="h-5 w-5" />,
      selector: (row) => row.status || '-',
    },
    { name: 'Type', selector: (row) => row.kind || '-' },
    { name: 'Details', selector: (row) => row.message || '-' },
    { name: 'Credit', selector: (row) => row.credit },
    { name: 'Debit', selector: (row) => row.debit },
    { name: 'Date', selector: (row) => row.date },
  ];

  const handlePageChange = (page) => setPages(page);
  const handleLimitChange = (newPerPage) => {
    setLimit(newPerPage);
    setPages(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [transactionsRes, ordersRes, refundsRes] = await Promise.all([
          axiosAuthInstance.get('shopify/transactions'),
          axiosAuthInstance.get('shopify/order'),
          axiosAuthInstance.get('shopify/refund'),
        ]);

        // Process orders (total earnings)
        if (ordersRes?.status === 200) {
          const orders = ordersRes.data.orders || [];
          const earnings = orders.reduce((sum, order) => sum + parseFloat(order.TotalPrice || '0'), 0);
          setTotalEarnings(earnings);
        }

        // Process refunds
        if (refundsRes?.status === 200) {
          const refunds = refundsRes.data.refunds || [];
          const totalRefund = refunds.reduce((sum, refund) => {
            return sum + refund.transactions.reduce((txnSum, txn) => txnSum + parseFloat(txn.amount || '0'), 0);
          }, 0);
          setTotalRefunds(totalRefund);
        }

        // Process transactions
        if (transactionsRes?.status === 200) {
          const transactions = transactionsRes.data.transactions || [];

          const transformed = transactions.map((txn) => {
            const amount = parseFloat(txn?.amount || '0').toFixed(2);
            const isSale = txn.kind === 'sale';
            const isRefund = txn.kind === 'refund';

            return {
              status: txn.status || '-',
              kind: txn.kind || '-',
              message: txn.message || '-',
              credit: isSale ? `₹${amount}` : '—',
              debit: isRefund ? `₹${amount}` : '—',
              date: txn.date ? new Date(txn.date).toLocaleDateString('en-IN') : '-',
            };
          });

          const totalWithdrawal = transactions.reduce((sum, txn) => {
            return sum + (txn.kind === 'sale' ? parseFloat(txn.amount || 0) : 0);
          }, 0);

          setData(transformed);
          setTotalRows(transformed.length);
          setTotalWithdrawals(totalWithdrawal);
        }
      } catch (error) {
        console.error('Error fetching ledger data:', error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='bg-white shadow rounded-lg py-2 px-4 flex justify-between items-center mb-6'>
        <h1 className='text-xl text-primary-500'>Ledger Book</h1>
      </div>

      <div className='grid gap-4 md:grid-cols-3 py-10 px-28'>
        <div className='flex shadow-md rounded-lg overflow-hidden'>
          <div className='bg-primary-400 p-4 flex items-center justify-center'>
            <span className='text-white text-xl'>₹</span>
          </div>
          <div className='bg-white p-4 flex-1'>
            <p className='text-lg font-medium'>₹{totalEarnings.toFixed(2)}</p>
            <p className='text-sm text-gray-500'>Total Earning</p>
          </div>
        </div>

        <div className='flex shadow-md rounded-lg overflow-hidden'>
          <div className='bg-green-400 p-4 flex items-center justify-center'>
            <span className='text-white text-xl'><PiMoney /></span>
          </div>
          <div className='bg-white p-4 flex-1'>
            <p className='text-lg font-medium'>₹{totalWithdrawals.toFixed(2)}</p>
            <p className='text-sm text-gray-500'>Total Withdrawal</p>
          </div>
        </div>

        <div className='flex shadow-md rounded-lg overflow-hidden'>
          <div className='bg-pink-500 p-4 flex items-center justify-center'>
            <span className='text-white text-xl'><LuRepeat2 /></span>
          </div>
          <div className='bg-white p-4 flex-1'>
            <p className='text-lg font-medium'>₹{totalRefunds.toFixed(2)}</p>
            <p className='text-sm text-gray-500'>Total Refund</p>
          </div>
        </div>
      </div>

      <div className='bg-white p-4 rounded-lg shadow'>
        <DataTable
          columns={columns}
          data={data.slice((pages - 1) * limit, pages * limit)}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationPerPage={limit}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
        />
      </div>
    </>
  );
};

export default LedgerBook;

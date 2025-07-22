import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdOutlineCurrencyRupee } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Modal from 'react-modal';
import { useLoading } from '../../Context/LoadingContext';

Modal.setAppElement('#root');

const WithdrawalModal = ({ isOpen, onRequestClose, transactions }) => {
  const totalAmount = transactions.reduce((sum, tx) => sum + parseFloat(tx?.receipt?.paid_amount || '0'), 0);
  const firstTxn = transactions[0] || {};

  const downloadReceiptAsPDF = () => {
    const doc = new jsPDF();
    doc.text('Withdrawal Receipt', 14, 10);
    autoTable(doc, {
      startY: 20,
      head: [['Invoice ID', 'Order ID', 'Amount', 'Payment Method', 'Date']],
      body: transactions.map(txn => [
        txn.id || '-',
        txn.order_id || '-',
        `${txn?.receipt?.paid_amount || '0.00'}`,
        txn?.payment_details?.payment_method_name || '-',
        txn.created_at ? new Date(txn.created_at).toLocaleDateString('en-IN') : '-',
      ]),
      theme: 'grid',
    });
    const finalY = doc.lastAutoTable.finalY || 30;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`Total Withdrawal: ${totalAmount.toFixed(2)}`, 14, finalY + 10);
    doc.save('withdrawal_receipt.pdf');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20 outline-none"
      overlayClassName="fixed inset-0 bg-white bg-opacity-50 flex items-start justify-center z-50"
    >
      <h2 className="text-xl font-semibold text-primary-600 mb-4 text-center">Withdrawal Summary</h2>
      <div className="space-y-2 text-sm">
        <p>
          <span className="text-gray-700 font-semibold">Total Withdrawal: </span>
          <span className="text-black font-medium">₹{totalAmount.toFixed(2)}</span>
        </p>
        <p>
          <span className="text-gray-700 font-semibold">Payment Method: </span>
          <span className="text-black font-medium">{firstTxn?.payment_details?.payment_method_name || '-'}</span>
        </p>
        <p>
          <span className="text-gray-700 font-semibold">Charges: </span>
          <span className="text-black font-medium">₹{firstTxn?.shop_money?.total_unsettled_set?.amount || '0.00'}</span>
        </p>
        <p>
          <span className="text-gray-700 font-semibold">UPI / Bank Info: </span>
          <span className="text-black font-medium">{firstTxn?.payment_details?.credit_card_name || '-'}</span>
        </p>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button onClick={onRequestClose} className="px-4 py-2 bg-gray-300 rounded text-sm hover:bg-gray-400">Close</button>
        <button onClick={downloadReceiptAsPDF} className="px-4 py-2 bg-primary-500 text-white text-sm rounded hover:bg-primary-600">Download Receipt</button>
      </div>
    </Modal>
  );
};

const Payments = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [dateRange, setDateRange] = useState([null, null]);
  const [isModalOpen, setIsModalOpen] = useState(false);
const {setLoading}=useLoading();
  const [startDate, endDate] = dateRange;

  const openWithdrawalModal = () => setIsModalOpen(true);
  const closeWithdrawalModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosAuthInstance.get('shopify/transactions');
        if (response?.status === 200) {
          const transformed = response.data.transactions.map((item) => ({ ...item }));
          setData(transformed);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
      finally{
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    const matchesSearch = Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesDate =
      (!startDate && !endDate) ||
      (item.created_at &&
        new Date(item.created_at) >= startDate &&
        new Date(item.created_at) <= endDate);
    return matchesSearch && matchesDate && item.kind === 'sale'; // Filter for kind 'sale'
  });

  const handleExport = (type) => {
    const exportData = filteredData.map((item) => ({
      Status: item.status,
      InvoiceId: item.id?.toString() || '-',
      OrderId: item.order_id?.toString() || '-',
      Amount: item?.receipt?.paid_amount?.toString() || '-',
      Charges: item?.shop_money?.total_unsettled_set?.amount?.toString() || '-',
      Payment: item.gateway || '-',
      Mode: item.payment_details?.payment_method_name || '-',
      Date: item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN') : 'N/A',
    }));

    if (type === 'PDF') {
      const doc = new jsPDF();
      doc.text('Transaction Report', 14, 10);
      autoTable(doc, {
        startY: 20,
        head: [Object.keys(exportData[0])],
        body: exportData.map(Object.values),
      });
      doc.save('transactions.pdf');
    }

    if (type === 'EXCEL') {
      const ws = XLSX.utils.json_to_sheet(exportData);
      ws['!cols'] = [
        { wch: 15 }, { wch: 20 }, { wch: 20 }, { wch: 15 },
        { wch: 15 }, { wch: 20 }, { wch: 20 }, { wch: 30 }, { wch: 18 },
      ];
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'transactions.xlsx');
    }

    if (type === 'CSV') {
      const ws = XLSX.utils.json_to_sheet(exportData);
      const csv = XLSX.utils.sheet_to_csv(ws);
      saveAs(new Blob([csv], { type: 'text/csv' }), 'transactions.csv');
    }

    if (type === 'PRINT') {
      const tableHeaders = ['Status', 'Invoice Id', 'Order Id', 'Amount', 'Charges', 'Payment', 'Mode', 'Date'];
      const tableRows = exportData.map(row => `
        <tr>${Object.values(row).map(cell => `<td>${cell}</td>`).join('')}</tr>
      `).join('');

      const printableContent = `
        <html>
          <head><title>Transaction Report</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 30px; }
              h2 { text-align: center; font-size: 22px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #000; padding: 8px; text-align: left; font-size: 13px; }
              th { background-color: #f0f0f0; }
            </style>
          </head>
          <body>
            <h2>Transaction Report</h2>
            <table><thead><tr>${tableHeaders.map(h => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody>${tableRows}</tbody></table>
          </body>
        </html>`;

      const printWindow = window.open('', '_blank');
      printWindow.document.write(printableContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const currentMonth = new Date().toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const columns = [
    { name: <FiMoreHorizontal title='Status' className='h-5 w-5' />, selector: row => row.status },
    { name: 'Invoice Id', selector: row => row.id },
    { name: 'Order Ids', selector: row => row.order_id },
    { name: 'Amount', selector: row => row?.receipt?.paid_amount },
    { name: 'Charges', selector: row => row.shop_money?.total_unsettled_set?.amount ?? '—' },
    { name: 'Payment', selector: row => row.gateway },
    { name: 'Mode', selector: row => row.payment_details?.payment_method_name },
    { name: 'Date', selector: row => row.created_at ? new Date(row.created_at).toLocaleDateString('en-IN') : 'N/A' },
  ];

  return (
    <>
      <div className='bg-white shadow rounded-lg text-primary-500 text-xl py-2 px-4 flex justify-between items-center mb-6'>
        Transactions For: {currentMonth}
        <div className='relative group'>
          <button
            onClick={openWithdrawalModal}
            className='bg-primary-500 text-white px-3 py-1.5 rounded-lg hover:bg-primary-600 flex items-center gap-1'>
            <MdOutlineCurrencyRupee className='w-4 h-4' />
            <span className='text-sm'>Withdrawal</span>
          </button>
          <span className='absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            Withdrawal Requests
          </span>
        </div>
      </div>

      <div className='bg-white shadow p-4 rounded-lg'>
        <div className='flex flex-wrap gap-4 items-center mb-4'>
          {['PRINT', 'PDF', 'EXCEL', 'CSV'].map(type => (
            <button key={type} onClick={() => handleExport(type)} className='bg-primary-500 text-white py-2 px-4 rounded'>
              {type}
            </button>
          ))}

          <DatePicker
            selected={startDate}
            onChange={(update) => setDateRange(update)}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            isClearable
            placeholderText='Choose Date Range'
            className='px-4 py-2 text-sm border rounded-md text-gray-600'
          />

          <input
            type='text'
            placeholder='Search...'
            className='border p-2 rounded-lg ml-auto'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredData.slice((pages - 1) * limit, pages * limit)}
          pagination
          paginationServer
          paginationTotalRows={filteredData.length}
          paginationPerPage={limit}
          onChangePage={setPages}
          onChangeRowsPerPage={setLimit}
        />
      </div>

      <WithdrawalModal isOpen={isModalOpen} onRequestClose={closeWithdrawalModal} transactions={filteredData} />
    </>
  );
};

export default Payments;

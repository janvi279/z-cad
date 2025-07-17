import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axiosAuthInstance from '../../../utils/axios/axiosAuthInstance';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const columns = [
  {
    name: 'Product',
    selector: (row) => row.product,
  },
  {
    name: 'Parent',
    selector: (row) => row.parent,
  },
  {
    name: 'Unit In Stock',
    selector: (row) => row.unitInStock || "",
  },
  {
    name: 'Stock Status',
    selector: (row) => row.stockStatus || "",
  },
];

const OutOfTheStock = () => {
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axiosAuthInstance.get('shopify/outOfStock');
      if (response && response.status === 200) {
        const products = response.data.products || [];
        const outOfStockItems = [];

        products.forEach((item) => {
          item.variants.forEach((variant) => {
            if (variant.inventory_quantity <= 20) {
              outOfStockItems.push({
                product: item.title,
                parent: item.product_type || '-',
                unitInStock: variant.inventory_quantity,
                stockStatus: "Out of Stock"
              });
            }
          });
        });

        setTotalRows(outOfStockItems.length);
        const startIndex = (pages - 1) * limit;
        setData(outOfStockItems.slice(startIndex, startIndex + limit));
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pages, limit]);

  // ✅ Move export functions OUTSIDE of the unused ExportButtons component
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Out Of Stock Products', 14, 10);
    autoTable(doc, {
      startY: 20,
      head: [['Product', 'Parent', 'Unit In Stock', 'Stock Status']],
      body: data.map(item => [
        item.product || '-',
        item.parent || '-',
        item.unitInStock ?? '0',
        item.stockStatus || '-',
      ]),
    });
    doc.save('out_of_stock.pdf');
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'OutOfStock');
    saveAs(new Blob([XLSX.write(wb, { type: 'array', bookType: 'xlsx' })]), 'out_of_stock.xlsx');
  };

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(ws);
    saveAs(new Blob([csv], { type: 'text/csv' }), 'out_of_stock.csv');
  };

  const printData = () => {
    const printableContent = data.map(d => `${d.product} | ${d.parent} | ${d.unitInStock} | ${d.stockStatus}`).join('\n');
    const win = window.open('', '', 'width=900,height=650');
    win.document.write(`<html><head><title>Print</title></head><body><pre>${printableContent}</pre></body></html>`);
    win.document.close();
    win.print();
  };

  const handleExport = (type) => {
    switch (type) {
      case 'PRINT':
        printData();
        break;
      case 'PDF':
        exportToPDF();
        break;
      case 'EXCEL':
        exportToExcel();
        break;
      case 'CSV':
        exportToCSV();
        break;
      default:
        break;
    }
  };

  const handlePageChange = (newPage) => {
    setPages(newPage);
  };

  const handleLimitPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPages(1);
  };

  return (
    <div>
      <div className='bg-white shadow rounded-lg text-primary-500 text-xl py-2 px-4 flex justify-between items-center mb-6'>
        Out Of Stock
      </div>
      <div className='mt-4 mb-4 flex gap-4'>
        {['PRINT', 'PDF', 'EXCEL', 'CSV'].map((type) => (
          <button
            key={type}
            className='px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600'
            onClick={() => handleExport(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={limit}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitPerPageChange}
      />
    </div>
  );
};

export default OutOfTheStock;

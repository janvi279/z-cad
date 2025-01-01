import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

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
        selector: (row) => row.unitInStock,
    },
    {
        name: 'Stock Status',
        selector: (row) => row.stockStatus,
    },
    {
        name: 'Actions',
        selector: (row) => row.actions,
    },
];

const OutOfTheStoke = () => {
    const [data, setData] = useState([]);
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalRows, setTotalRows] = useState(0);

    const handlePageChange = (newPage) => {
        setPages(newPage);
    };

    const handleLimitPerPageChange = (newLimit) => {
        setLimit(newLimit);
        setPages(1);
    };

    useEffect(() => {
        const temporaryData = [
            { id: 1, product: 'Product A', parent: 'Category 1', unitInStock: 5, stockStatus: 'Out of Stock', actions: 'View' },
            { id: 2, product: 'Product B', parent: 'Category 2', unitInStock: 0, stockStatus: 'Out of Stock', actions: 'View' },
            { id: 3, product: 'Product C', parent: 'Category 1', unitInStock: 10, stockStatus: 'In Stock', actions: 'View' },
            { id: 4, product: 'Product D', parent: 'Category 3', unitInStock: 0, stockStatus: 'Out of Stock', actions: 'View' },
            { id: 5, product: 'Product E', parent: 'Category 2', unitInStock: 3, stockStatus: 'Out of Stock', actions: 'View' },
        ];
        setData(temporaryData);
        setTotalRows(temporaryData.length);
    }, []);

    return (
        <div>
            <div className='flex items-center justify-between border-b px-4 pb-2'>
                <h1 className='text-2xl'>Out Of The Stock</h1>
            </div>
            <div className='mt-4 mb-4 flex gap-4'>
                <button className='px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600'>
                    PRINT
                </button>
                <button className='px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600'>
                    PDF
                </button>
                <button className='px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600'>
                    EXCEL
                </button>
                <button className='px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600'>
                    CSV
                </button>
            </div>
            {/* Data Table */}
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

export default OutOfTheStoke;

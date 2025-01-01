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
        name: 'Unit In Stoke',
        selector: (row) => row.unitInStoke,
    },
    {
        name: 'Stoke Status',
        selector: (row) => row.stokeStatus,
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

    // temporaryData
    // useEffect(() => {
    //     const temporaryData = [
    //         { id: 1, product: 'Product A', parent: 'Category 1', unitInStoke: 5, stokeStatus: 'Out of Stock', actions: 'View' },
    //         { id: 2, product: 'Product B', parent: 'Category 2', unitInStoke: 0, stokeStatus: 'Out of Stock', actions: 'View' },
    //         { id: 3, product: 'Product C', parent: 'Category 1', unitInStoke: 10, stokeStatus: 'In Stock', actions: 'View' },
    //         { id: 4, product: 'Product D', parent: 'Category 3', unitInStoke: 0, stokeStatus: 'Out of Stock', actions: 'View' },
    //         { id: 5, product: 'Product E', parent: 'Category 2', unitInStoke: 3, stokeStatus: 'Out of Stock', actions: 'View' },
    //     ];
    //     setData(temporaryData);
    //     setTotalRows(temporaryData.length); 
    // }, []);

    return (
        <div>
            <div className='flex items-center justify-between border-b px-4 pb-2'>
                <h1 className='text-2xl'>Out Of The Stoke</h1>
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

export default OutOfTheStoke;

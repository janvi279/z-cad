import React, { useState } from 'react'
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'File',
        selector: (row) => row.file,
    },
    {
        name: 'Associate',
        selector: (row) => row.associate,
    },
    {
        name: 'Size',
        selector: (row) => row.size,
    },
    {
        name: 'Actions',
        selector: (row) => row.actions,
    },
];

const Media = () => {
    const [data, setData] = useState([]);
    const [pages, setPages] = useState(1)
    const [limit, setLimit] = useState(10)
    const [totalRows, setTotalRows] = useState(0)

    const handlePageChange = (newPage) => {
        setPages(newPage)
    }

    const handleLimitPerPageChange = (newLimit) => {
        setLimit(newLimit)
        setPages(1)
    }

    const onSelectRow = (selectedRow) => { }

    return (
        <div>
            <div className='flex items-center justify-between border-b px-4 pb-2'>
                <h1 className='text-2xl'>Media</h1>
                <button className="px-4 py-2 text-sm bg-primary-500 text-white rounded-md flex items-center gap-2">
                    Bulk Delete
                </button>
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
                selectableRows
                onSelectedRowsChange={onSelectRow}
            />
        </div>
    )
}

export default Media

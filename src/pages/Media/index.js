import React, { useState } from 'react'
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: '',
        cell: (row) => {
            const handleSelect = () => { }
            return (
                <input
                    type="checkbox"
                    checked={row.selected}
                    onChange={() => handleSelect(row._id)}
                    className="border-gray-300 rounded h-5 w-5"
                />
            )
        },
        width: '50px',
    },
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

    return (
        <div>
            <div className='flex items-center justify-between border-b px-4 pb-2'>
                <h1 className='text-2xl'>Media</h1>
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
    )
}

export default Media

import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Select from "react-select";

const columns = [
    {
        name: 'Type',
        selector: (row) => row.type,
    },
    {
        name: 'Message',
        selector: (row) => row.message,
    },
    {
        name: 'Date',
        selector: (row) => row.date,
    },
    {
        name: 'Actions',
        selector: (row) => row.actions,
    },
];

const options1 = [
    { value: "unread", label: "Only Unread" },
    { value: "read", label: "Only Read" },
];

const options2 = [];

const Notifications = () => {
    const [data, setData] = useState([]);
    const [pages, setPages] = useState(1)
    const [limit, setLimit] = useState(10)
    const [totalRows, setTotalRows] = useState(0)
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);



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
                <h1 className='text-2xl'>Notifications</h1>
                <div className='flex gap-2'>
                    <Select
                        options={options1}
                        placeholder="Only Unread"
                        value={selectedOption1}
                        onChange={setSelectedOption1}
                    />
                    <Select
                        options={options2}
                        placeholder="All"
                        value={selectedOption2}
                        onChange={setSelectedOption2}
                    />
                    <button className="px-4 py-2 text-sm bg-primary-500 text-white rounded-md flex items-center gap-2">
                        Mark Read
                    </button>

                    <button className="px-4 py-2 text-sm bg-primary-500 text-white rounded-md flex items-center gap-2">
                        Delete
                    </button>
                </div>
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

export default Notifications

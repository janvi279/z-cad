import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

const columns = [
    {
        name: 'File',
        selector: row => row.image?.src ?? '',
        cell: row =>
            row.image?.src ? (
                <img src={row.image.src} alt="product" width={50} height={50} style={{ objectFit: 'contain' }} />
            ) : (
                'No image'
            ),
    },
    {
        name: 'Associate',
        selector: (row) => row.vendor,
    },
    {
        name: 'Size',
        selector: (row) => row.variants?.[0]?.option1,
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

    const fetchData = async () => {
        try {
            const response = await axiosAuthInstance.get('shopify/product')
            if (response && response.status === 200) {
                const transformedData = response.data.products.map((item) => ({
                    ...item,
                    actions: (
                        <div className='flex items-center'>
                          
                            <button    onClick={() => console.log("log")}
                                className='text-blue-500 text-lg px-4 py-2 rounded'><MdOutlineDelete/></button>
                        </div>
                    ),
                }));
                console.log("response", response)

                setData(transformedData);
            }
        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
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
            <div className='bg-white shadow rounded-lg text-primary-500 text-xl py-2 px-4 flex justify-between items-center mb-6'>
                <h1 className='text-xl'>Media</h1>
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
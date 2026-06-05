import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axiosAuthInstance from "../../utils/axios/axiosAuthInstance";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import Header from '../../Components/Header/Header';

const columns = [
    {
        name: "First Name",
        selector: (row) => row.firstName,
    },
    {
        name: "Last Name",
        selector: (row) => row.lastName,
    },
    {
        name: "Email",
        selector: (row) => row.email,
    },
    {
        name: "Mobile No.",
        selector: (row) => row.phone,
    },

    {
        name: "Status",
        selector: (row) => (
            <span
                className={
                    row.status === "1"
                        ? "text-red-500"
                        : "text-green-500"
                }
            >
                {row.status === "1"
                    ? "Not Approved"
                    : "Approved"}
            </span>
        ),
    },
    {
        name: "Actions",
        selector: (row) => row.actions,
    },
];

const DistributorInfo = () => {
    const [data, setData] = useState([]);
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalRows, setTotalRows] =
        useState(0);
    const [search, setSearch] =
        useState("");


    const fetchData = async () => {
        try {
            const response =
                await axiosAuthInstance.get(
                    "distributor/all",
                    {
                        params: {
                            page: pages,
                            limit: limit,
                            search: search,
                        },
                    }
                );

            if (
                response &&
                response.status === 200
            ) {
                const transformedData =
                    response.data.result.docs.map(
                        (item) => ({
                            ...item,

                            actions: (
                                <div className='flex items-center gap-5'>



                                    {item.status === "1" && (
                                        <div>
                                            <button
                                                className='bg-primary-500 text-white px-4 py-2 rounded'
                                                onClick={() =>
                                                    handleApprove(
                                                        item._id
                                                    )
                                                }
                                            >
                                                Approve
                                            </button>
                                        </div>
                                    )}

                                </div>

                            ),
                        })
                    );

                setData(transformedData);

                setTotalRows(
                    response.data.result.totalDocs
                );
            }
        } catch (error) {
            console.log(
                "Error fetching distributor data:",
                error
            );
        }
    };
    const handleApprove = async (id) => {
        try {
            const response =
                await axiosAuthInstance.put(
                    `distributor/update-status/${id}`
                );

            if (
                response &&
                response.status === 200
            ) {
                fetchData();
            }
        } catch (error) {
            console.log(
                "Error approving distributor:",
                error
            );
        }
    };
    const handlePageChange = (
        newPage
    ) => {
        setPages(newPage);
    };

    const handleLimitPerPageChange = (
        newLimit
    ) => {
        setLimit(newLimit);
        setPages(1);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData();
        }, 500);

        return () => clearTimeout(timer);
    }, [pages, limit, search]);

    return (
        <div className="p-3">

            <h1 className="text-2xl mb-3">
                Distributors
            </h1>

            <div className="mb-4">

                <input
                    type="text"
                    placeholder="Search Distributor..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPages(1);
                    }}
                    className="border rounded-lg px-4 py-2 w-80"
                />

            </div>

            <DataTable
                columns={columns}
                data={data}
                pagination
                paginationServer
                paginationTotalRows={
                    totalRows
                }
                onChangePage={
                    handlePageChange
                }
                onChangeRowsPerPage={
                    handleLimitPerPageChange
                }
            />

        </div>
    );
};

export default DistributorInfo;
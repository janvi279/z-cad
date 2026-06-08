import React, {
    useEffect,
    useState,
} from "react";
import DataTable from "react-data-table-component";

import { getAssignedProducts } from "../DistributerOwnProducts/services/productService";
import { FiEye } from "react-icons/fi";
import ViewModal from "./ViewModal";

const MyProduct = () => {
    const [products, setProducts] =
        useState([]);
    const [loading, setLoading] =
        useState(false);
    const [viewModal, setViewModal] =
        useState(false);

    const [
        selectedProduct,
        setSelectedProduct,
    ] = useState(null);

    const fetchProducts =
        async () => {
            try {
                setLoading(true);

                const response =
                    await getAssignedProducts();

                setProducts(
                    response.data.products || []
                );
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchProducts();
    }, []);

    const columns = [
        {
            name: "Book Name",
            selector: (row) =>
                row.book?.title || "-",
            sortable: true,
        },
        {
            name: "SKU",
            selector: (row) =>
                row.book?.sku || "-",
        },
        {
            name: "Category",
            selector: (row) =>
                row.book?.category || "-",
        },
        {
            name: "Author",
            selector: row =>
                `${row.author?.firstName || ""}
       ${row.author?.lastName || ""}`,
        },
        {
            name: "Author Mail",
            selector: (row) =>
                row.author?.email || "-",
        },
        {
            name: "Commission %",
            selector: (row) =>
                row.commissionPercentage || 0,
        },
        {
            name: "Status",
            selector: (row) =>
                row.status,
        },
        {
            name: "Action",
            cell: (row) => (
                <button
                    onClick={() => {
                        setSelectedProduct(row);
                        setViewModal(true);
                    }}
                    className="text-blue-500"
                >
                    <FiEye size={20} />
                </button>
            ),
        }
    ];

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">
                My Assign Products
            </h2>

            <DataTable
                columns={columns}
                data={products}
                progressPending={loading}
                pagination
                highlightOnHover
            />
            <ViewModal
                show={viewModal}
                onClose={() =>
                    setViewModal(false)
                }
                product={selectedProduct}
            />
        </div>
    );
};

export default MyProduct;
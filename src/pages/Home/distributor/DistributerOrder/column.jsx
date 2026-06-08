import {
    FiEye,
} from "react-icons/fi";

export const columns = (
    handleView
) => [
        {
            name: "Order No",
            selector: row =>
                row.orderNo,
        },

        {
            name: "Customer",
            selector: row =>
                row.customer_name || "-",
        },

        {
            name: "Items",
            selector: row =>
                row.itemsSold,
        },

        {
            name: "Amount",
            selector: row =>
                `₹${row.TotalPrice}`,
        },

        {
            name: "Date",
            selector: row =>
                new Date(
                    row.orderCreate
                ).toLocaleDateString(),
        },

        {
            name: "Action",

            cell: row => (
                <button
                    onClick={() =>
                        handleView(row)
                    }
                    className="text-primary-500 text-lg"
                >
                    <FiEye />
                </button>
            ),
        },
    ];
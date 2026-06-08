import {
  FiEye,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";

export const getColumns = (
  handleView,
  handleEdit,
  handleDelete
) => [
  {
    name: "Book",
    selector: (row) =>
      row.book?.title || "-",
  },

  {
    name: "SKU",
    selector: (row) =>
      row.sku || "-",
  },

  {
    name: "Category",
    selector: (row) =>
      row.book?.category || "-",
  },

  {
    name: "Distributor",
   selector: row =>
      `${row.distributor?.firstName || ""}
       ${row.distributor?.lastName || ""}`,
  
  },

  {
    name: "Author",
    selector: (row) =>
      `${row.author?.firstName || ""}
       ${row.author?.lastName || ""}`,
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
    name: "Cover",
    cell: (row) => (
      <img
        src={row.book?.coverImage}
        alt="book"
        className="w-12 h-12 object-cover rounded"
      />
    ),
  },

  {
    name: "Action",

    cell: (row) => (
      <div className="flex gap-2">

        <button
          onClick={() =>
            handleView(row)
          }
          className="text-primary-500"
        >
          <FiEye />
        </button>

        <button
          onClick={() =>
            handleEdit(row)
          }
          className="text-primary-500"
        >
          <FiEdit />
        </button>

        <button
          onClick={() =>
            handleDelete(row._id)
          }
          className="text-red-500"
        >
          <FiTrash2 />
        </button>

      </div>
    ),
  },
];
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
    selector: row =>
      row.productId?.title || "-",
  },

  {
    name: "Distributor",
   selector: row =>
      `${row.distributorId?.firstName || ""}
       ${row.distributorId?.lastName || ""}`,
  
  },

  {
    name: "Author",
    selector: row =>
      `${row.authorId?.firstName || ""}
       ${row.authorId?.lastName || ""}`,
  },

  {
    name: "Commission %",
    selector: row =>
      row.commissionPercentage,
  },

  {
    name: "Status",
    selector: row =>
      row.status,
  },

  {
    name: "Action",

    cell: row => (
      <div className="flex gap-2">

        <button
          onClick={() =>
            handleView(row)
          }
        >
          <FiEye />
        </button>

        <button
          onClick={() =>
            handleEdit(row)
          }
        >
          <FiEdit />
        </button>

        <button
          onClick={() =>
            handleDelete(
              row._id
            )
          }
        >
          <FiTrash2 />
        </button>

      </div>
    ),
  },
];
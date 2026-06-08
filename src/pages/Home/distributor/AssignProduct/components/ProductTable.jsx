import DataTable from "react-data-table-component";

const ProductTable = ({
  columns,
  data,
}) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      responsive
      highlightOnHover
    />
  );
};

export default ProductTable;
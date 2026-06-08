import { useState } from "react";
import DataTable from "react-data-table-component";

import { useOrders } from "./hooks/useOrders";
import { columns } from "./column";
import OrderViewModal from "./ViewModal";

const DistributerOrder = () => {

    const { orders } =
        useOrders();
        const [
  selectedOrder,
  setSelectedOrder,
] = useState(null);

const [
  showModal,
  setShowModal,
] = useState(false);

const handleView =
  (row) => {

    setSelectedOrder(
      row
    );

    setShowModal(true);
  };

    return (
        <div className="p-5">

            <h1 className="text-2xl font-bold mb-4">
                Distributor Orders
            </h1>

            <DataTable
                columns={columns(handleView)}
                data={orders}
                pagination
            />
            <OrderViewModal
  show={showModal}
  onClose={() =>
    setShowModal(false)
  }
  order={
    selectedOrder
  }
/>

        </div>
    );
};

export default DistributerOrder;
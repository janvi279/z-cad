import React, { useState } from "react";

import ProductTable from "./components/ProductTable";
import AssignModal from "./components/AssignModal";

import { getColumns } from "./columns";

import { useAssignProduct } from "./hooks/useAssignProduct";
import { deleteAssignment } from "./services/assignProductService";
import { toast } from "react-hot-toast";
import EditModal from "./components/editModal";

import ViewModal from "./components/ViewModal";

const AssignProduct = () => {
  const {
    books,
    distributors,
    assignedProducts,
    fetchData,
  } = useAssignProduct();

  const [showModal, setShowModal] =
    useState(false);
  const [
    selectedAssignment,
    setSelectedAssignment,
  ] = useState(null);
const [editModal, setEditModal] =
  useState(false);


  const [
    viewModal,
    setViewModal,
  ] = useState(false);

  const handleView = (
    assignment
  ) => {

    setSelectedAssignment(
      assignment
    );

    setViewModal(true);
  };

 const handleEdit = (
  assignment
) => {

  setSelectedAssignment(
    assignment
  );

  setEditModal(true);
};
  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete Assignment?"
        )
      )
        return;

      try {

        await deleteAssignment(
          id
        );

        toast.success(
          "Deleted Successfully"
        );

        fetchData();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message
        );

      }
    };

  return (
    <div className="p-5">

      <div className="flex justify-between items-center mb-4">

        <h1 className="text-2xl font-bold">
          Assigned Products
        </h1>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-primary-500 text-white px-4 py-2 rounded"
        >
          Assign Product
        </button>

      </div>

      <ProductTable
        columns={getColumns(
          handleView,
          handleEdit,
          handleDelete
        )}
        data={assignedProducts}
      />

      <AssignModal
        showModal={showModal}
        setShowModal={setShowModal}
        books={books}
        distributors={distributors}
        refreshData={fetchData}
      />
      <EditModal
  show={editModal}
  onClose={() =>
    setEditModal(false)
  }
  assignment={
    selectedAssignment
  }
  distributors={
    distributors
  }
  refreshData={fetchData}
/>
      <ViewModal
        show={viewModal}
        onClose={() => setViewModal(false)}
        assignment={selectedAssignment}
      />

    </div>
  );
};

export default AssignProduct;
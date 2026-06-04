import React, {
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import {
  updateAssignment,
} from "../services/assignProductService";

const EditModal = ({
  show,
  onClose,
  assignment,
  distributors,
  refreshData,
}) => {

  const [
    formData,
    setFormData,
  ] = useState({
    distributorId: "",
    commissionPercentage: 20,
    status: "Active",
  });

  useEffect(() => {

    if (
      assignment
    ) {

      setFormData({
        distributorId:
          assignment
            ?.distributorId
            ?._id || "",

        commissionPercentage:
          assignment
            ?.commissionPercentage ||
          20,

        status:
          assignment
            ?.status ||
          "Active",
      });
    }

  }, [assignment]);

  const handleSubmit =
    async () => {

      try {

        await updateAssignment(
          assignment._id,
          formData
        );

        toast.success(
          "Updated Successfully"
        );

        refreshData();

        onClose();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message
        );

      }
    };

  if (
    !show ||
    !assignment
  )
    return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-xl w-[500px]">

        <h2 className="text-xl font-bold mb-4">
          Edit Assignment
        </h2>

        <div className="mb-4">

          <label>
            Book
          </label>

          <input
            disabled
            value={
              assignment
                ?.productId
                ?.title
            }
            className="w-full border p-2 rounded bg-gray-100"
          />

        </div>

        <div className="mb-4">

          <label>
            Distributor
          </label>

   <select
  value={formData.distributorId}
  onChange={(e) =>
    setFormData({
      ...formData,
      distributorId: e.target.value,
    })
  }
  className="w-full border p-2 rounded"
>
  <option value="">
    Select Distributor
  </option>

  {distributors?.map((distributor) => (
    <option
      key={distributor._id}
      value={distributor._id}
    >
      {distributor.name ||
        `${distributor.firstName || ""} ${distributor.lastName || ""}`}
    </option>
  ))}
</select>
        </div>

        <div className="mb-4">

          <label>
            Commission %
          </label>

          <input
            type="number"
            value={
              formData.commissionPercentage
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                commissionPercentage:
                  e.target.value,
              })
            }
            className="w-full border p-2 rounded"
          />

        </div>

        <div className="mb-4">

          <label>
            Status
          </label>

          <select
            value={
              formData.status
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                status:
                  e.target.value,
              })
            }
            className="w-full border p-2 rounded"
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

          </select>

        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={
              handleSubmit
            }
            className="bg-primary-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditModal;
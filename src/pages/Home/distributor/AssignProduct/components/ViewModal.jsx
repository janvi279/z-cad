import React from "react";

const ViewModal = ({
  show,
  onClose,
  assignment,
}) => {

  if (
    !show ||
    !assignment
  )
    return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[600px] rounded-xl p-6">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-xl font-bold">
            Assignment Details
          </h2>

          <button
            onClick={onClose}
            className="text-red-500 text-lg"
          >
            ✕
          </button>

        </div>

        <div className="space-y-3">

          <div>
            <strong>
              Book :
            </strong>{" "}
            {
              assignment
                ?.productId
                ?.title
            }
          </div>

          <div>
            <strong>
              Distributor :
            </strong>{" "}
            {
              assignment
                ?.distributorId
                ?.firstName
            }{" "}
            {
              assignment
                ?.distributorId
                ?.lastName
            }
          </div>

          <div>
            <strong>
              Author :
            </strong>{" "}
            {
              assignment
                ?.authorId
                ?.firstName
            }{" "}
            {
              assignment
                ?.authorId
                ?.lastName
            }
          </div>

          <div>
            <strong>
              Email :
            </strong>{" "}
            {
              assignment
                ?.authorId
                ?.email
            }
          </div>

          <div>
            <strong>
              Commission :
            </strong>{" "}
            {
              assignment
                ?.commissionPercentage
            }
            %
          </div>

          <div>
            <strong>
              Status :
            </strong>{" "}
            {
              assignment
                ?.status
            }
          </div>

          <div>
            <strong>
              Assigned Date :
            </strong>{" "}
            {new Date(
              assignment.createdAt
            ).toLocaleDateString()}
          </div>

        </div>

      </div>

    </div>
  );
};

export default ViewModal;
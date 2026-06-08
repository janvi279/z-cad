
const ViewModal = ({
  show,
  onClose,
  assignment,
}) => {

  if (!show || !assignment)
    return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[650px] rounded-xl p-6">

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

        <div className="flex gap-5 mb-5">

          <img
            src={
              assignment?.book
                ?.coverImage
            }
            alt="Book"
            className="w-28 h-36 object-cover rounded border"
          />

          <div className="space-y-2">

            <div>
              <strong>
                Book :
              </strong>{" "}
              {
                assignment?.book
                  ?.title
              }
            </div>

            <div>
              <strong>
                SKU :
              </strong>{" "}
              {
                assignment?.sku
              }
            </div>

            <div>
              <strong>
                Category :
              </strong>{" "}
              {
                assignment?.book
                  ?.category
              }
            </div>

            <div>
              <strong>
                Book Status :
              </strong>{" "}
              {
                assignment?.book
                  ?.status
              }
            </div>

          </div>

        </div>

        <hr className="my-4" />

        <div className="space-y-3">

          <div>
            <strong>
              Distributor :
            </strong>{" "}
            {
              assignment
                ?.distributor
                ?.firstName
            }{" "}
            {
              assignment
                ?.distributor
                ?.lastName
            }
          </div>

          <div>
            <strong>
              Distributor Email :
            </strong>{" "}
            {
              assignment
                ?.distributor
                ?.email
            }
          </div>

          <div>
            <strong>
              Author :
            </strong>{" "}
            {
              assignment
                ?.author
                ?.firstName
            }{" "}
            {
              assignment
                ?.author
                ?.lastName
            }
          </div>

          <div>
            <strong>
              Author Email :
            </strong>{" "}
            {
              assignment
                ?.author
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
              Assignment Status :
            </strong>{" "}
            {
              assignment
                ?.status
            }
          </div>


        </div>

      </div>

    </div>
  );
};

export default ViewModal;
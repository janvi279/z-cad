import React from "react";

const OrderViewModal = ({
  show,
  onClose,
  order,
}) => {

  if (!show || !order)
    return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-[900px] max-h-[90vh] overflow-y-auto p-6">

        <div className="flex justify-between mb-5">

          <h2 className="text-2xl font-bold">
            Order Details
          </h2>

          <button
            onClick={onClose}
            className="text-red-500"
          >
            ✕
          </button>

        </div>

        {/* Order Info */}

        <div className="grid grid-cols-2 gap-4 mb-6">

          <div>
            <strong>
              Order No :
            </strong>{" "}
            {order.orderNo}
          </div>

          <div>
            <strong>
              Shopify Order ID :
            </strong>{" "}
            {order.orderId}
          </div>

          <div>
            <strong>
              Customer :
            </strong>{" "}
            {order.customer_name}
          </div>

          <div>
            <strong>
              Email :
            </strong>{" "}
            {order.email}
          </div>

          <div>
            <strong>
              Total Price :
            </strong>{" "}
            ₹
            {order.TotalPrice}
          </div>

          <div>
            <strong>
              Items Sold :
            </strong>{" "}
            {order.itemsSold}
          </div>

          <div>
            <strong>
              Confirmed :
            </strong>{" "}
            {order.orderConfirm}
          </div>

          <div>
            <strong>
              Order Date :
            </strong>{" "}
            {new Date(
              order.orderCreate
            ).toLocaleString()}
          </div>

        </div>

        {/* Products */}

        <h3 className="font-bold text-lg mb-3">
          Products
        </h3>

        <table className="w-full border">

          <thead>

            <tr className="bg-gray-100">

              <th className="border p-2">
                Product
              </th>

              <th className="border p-2">
                SKU
              </th>

              <th className="border p-2">
                Price
              </th>

              <th className="border p-2">
                Qty
              </th>

              <th className="border p-2">
                Total
              </th>

            </tr>

          </thead>

          <tbody>

            {order.products?.map(
              (
                product,
                index
              ) => (
                <tr
                  key={index}
                >

                  <td className="border p-2">
                    {
                      product.productName
                    }
                  </td>

                  <td className="border p-2">
                    {
                      product.sku
                    }
                  </td>

                  <td className="border p-2">
                    ₹
                    {
                      product.productPrice
                    }
                  </td>

                  <td className="border p-2">
                    {
                      product.quantity
                    }
                  </td>

                  <td className="border p-2">
                    ₹
                    {
                      product.total
                    }
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

        {/* Fulfillment */}

        <h3 className="font-bold text-lg mt-6 mb-3">
          Fulfillment Status
        </h3>

        <table className="w-full border">

          <thead>

            <tr className="bg-gray-100">

              <th className="border p-2">
                Title
              </th>

           

            </tr>

          </thead>

          <tbody>

            {order.line_items?.map(
              (
                item,
                index
              ) => (
                <tr
                  key={index}
                >

                  <td className="border p-2">
                    {
                      item.title
                    }
                  </td>

                  

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default OrderViewModal;
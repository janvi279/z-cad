import React, {
  useEffect,
  useState,
} from "react";

import axiosAuthInstance from "../../../utils/axios/axiosAuthInstance";
import { toast } from "react-hot-toast";

function AssignProduct() {

  const [distributors, setDistributors] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [formData, setFormData] =
    useState({
      distributorId: "",
      productId: "",
      authorId: "",
      commissionPercentage: 20,
    });

  const fetchDistributors =
    async () => {
      try {

        const res =
          await axiosAuthInstance.get(
            "/distributor/all"
          );

        setDistributors(
          res.data.result.docs
        );

      } catch (err) {
        console.log(err);
      }
    };

  const fetchProducts =
    async () => {
      try {

        const res =
          await axiosAuthInstance.get(
            "/book/all-books"
          );

        setProducts(
          res.data.result.docs
        );

      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {

    fetchDistributors();
    fetchProducts();

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleProductChange =
    (e) => {

      const selected =
        products.find(
          (item) =>
            item._id ===
            e.target.value
        );

      setFormData({
        ...formData,
        productId:
          e.target.value,
        authorId:
          selected?.authorId,
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await axiosAuthInstance.post(
            "/distributor/assign-product",
            formData
          );

        toast.success(
          res.data.message
        );

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message
        );

      }
    };

  return (
    <div className="p-6">

      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Assign Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>

            <label>
              Distributor
            </label>

            <select
              name="distributorId"
              value={
                formData.distributorId
              }
              onChange={
                handleChange
              }
              className="w-full border p-2 rounded"
            >
              <option value="">
                Select Distributor
              </option>

              {distributors.map(
                (item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.firstName}
                    {" "}
                    {item.lastName}
                  </option>
                )
              )}
            </select>

          </div>

          <div>

            <label>
              Product
            </label>

            <select
              value={
                formData.productId
              }
              onChange={
                handleProductChange
              }
              className="w-full border p-2 rounded"
            >
              <option value="">
                Select Product
              </option>

              {products.map(
                (item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.title}
                  </option>
                )
              )}
            </select>

          </div>

          <div>

            <label>
              Commission %
            </label>

            <input
              type="number"
              name="commissionPercentage"
              value={
                formData.commissionPercentage
              }
              onChange={
                handleChange
              }
              className="w-full border p-2 rounded"
            />

          </div>

          <button
            type="submit"
            className="bg-primary-500 text-white px-5 py-2 rounded"
          >
            Assign Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default AssignProduct;
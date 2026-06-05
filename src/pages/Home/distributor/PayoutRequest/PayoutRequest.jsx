import React, {
  useEffect,
  useState,
} from "react";

import {
  getWallet,
  requestPayout,
} from "../../distributor/PayoutRequest/services/index";

import { toast } from "react-hot-toast";

const PayoutRequest = () => {
  const [wallet, setWallet] =
    useState(null);

  const [amount, setAmount] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const fetchWallet =
    async () => {
      try {
        const response =
          await getWallet();

        setWallet(
          response.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (!amount) {
        toast.error(
          "Please enter amount"
        );
        return;
      }

      if (
        Number(amount) <= 0
      ) {
        toast.error(
          "Invalid amount"
        );
        return;
      }

      if (
        Number(amount) >
        Number(
          wallet?.balance || 0
        )
      ) {
        toast.error(
          "Insufficient balance"
        );
        return;
      }

      try {
        setLoading(true);

        const response =
          await requestPayout({
            amount,
          });

        if (
          response.data.success
        ) {
          toast.success(
            "Payout request submitted successfully"
          );

          setAmount("");

          fetchWallet();
        }
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">
        Wallet & Payout
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500">
            Available Balance
          </p>

          <h2 className="text-2xl font-bold text-green-600">
            ₹
            {wallet?.balance ||
              0}
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500">
            Total Earnings
          </p>

          <h2 className="text-2xl font-bold">
            ₹
            {wallet?.totalEarnings ||
              0}
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500">
            Total Withdrawn
          </p>

          <h2 className="text-2xl font-bold text-red-500">
            ₹
            {wallet?.totalWithdrawn ||
              0}
          </h2>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-4">
          Request Payout
        </h2>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <div className="mb-4">
            <label className="block mb-2">
              Amount
            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              className="w-full border rounded px-3 py-2"
              placeholder="Enter amount"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary-500 text-white px-5 py-2 rounded"
          >
            {loading
              ? "Submitting..."
              : "Request Payout"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PayoutRequest;
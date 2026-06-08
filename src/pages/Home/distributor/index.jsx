import React, { useEffect, useState } from "react";
import {
  MdInventory,
  MdShoppingCart,
  MdPayments,
  MdAccountBalanceWallet,
} from "react-icons/md";

import { getDistributorDashboard } from "../../Home/distributor/services/distributorApi";

function DistributorDashboard() {
  const [data, setData] = useState({});

  const fetchDashboard = async () => {
    try {
      const res = await getDistributorDashboard();
      setData(res.data.cards);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Assigned Products",
      value: data.totalProducts || 0,
      icon: <MdInventory size={28} />,
    },
    {
      title: "Total Orders",
      value: data.totalOrders || 0,
      icon: <MdShoppingCart size={28} />,
    },
    {
      title: "Revenue",
      value: `₹${data.totalRevenue || 0}`,
      icon: <MdPayments size={28} />,
    },
    {
      title: "Commission",
      value: `₹${data.totalCommission || 0}`,
      icon: <MdAccountBalanceWallet size={28} />,
    },
  ];

  return (
    <div className="p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Distributor Dashboard
        </h2>

        <p className="text-gray-500">
          Welcome to Distributor Analytics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {card.value}
                </h3>
              </div>

              <div className="h-14 w-14 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                {card.icon}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Recent Activity */}

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">

        <h4 className="text-lg font-semibold mb-4">
          Distributor Overview
        </h4>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="border rounded-lg p-4">
            <p className="text-gray-500">
              Available Commission
            </p>

            <h3 className="text-2xl font-bold text-green-600">
              ₹{data.totalCommission || 0}
            </h3>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-gray-500">
              Active Products
            </p>

            <h3 className="text-2xl font-bold">
              {data.totalProducts || 0}
            </h3>
          </div>

        </div>

      </div>
    </div>
  );
}

export default DistributorDashboard;
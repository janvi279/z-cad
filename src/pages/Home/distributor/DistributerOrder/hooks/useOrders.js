import { useEffect, useState } from "react";
import { getDistributorOrders } from "../service";

export const useOrders = () => {

  const [orders, setOrders] =
    useState([]);

  const fetchOrders =
    async () => {

      try {

        const res =
          await getDistributorOrders();

        setOrders(
          res.data.orders || []
        );

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    fetchOrders,
  };
};
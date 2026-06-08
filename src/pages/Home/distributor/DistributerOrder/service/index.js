import axiosAuthInstance from "../../../../../utils/axios/axiosAuthInstance";

export const getDistributorOrders =
  () =>
    axiosAuthInstance.get(
      "distributor/orders"
    );
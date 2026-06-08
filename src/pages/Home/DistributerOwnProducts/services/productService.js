import axiosAuthInstance from "../../../../utils/axios/axiosAuthInstance";

export const getAssignedProducts = () => {
  return axiosAuthInstance.get(
    "/distributor/assigned-products"
  );
};
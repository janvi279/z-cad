import axiosAuthInstance from "../../../../../utils/axios/axiosAuthInstance";

export const getWallet = () =>
    axiosAuthInstance.get(
        "distributor/wallet"
    );

export const requestPayout = (
    data
) =>
    axiosAuthInstance.post(
        "distributor/payout-request",
        data
    );
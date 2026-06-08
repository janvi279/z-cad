import React from "react";

const ViewModal = ({
    show,
    onClose,
    product,
}) => {
    if (!show || !product) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[600px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        Product Details
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-red-500 text-xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold">
                            Book Name
                        </label>
                        <p>
                            {product?.book?.title ||
                                "-"}
                        </p>
                    </div>

                    <div>
                        <label className="font-semibold">
                            SKU
                        </label>
                        <p>
                            {product?.book?.sku ||
                                "-"}
                        </p>
                    </div>

                    <div>
                        <label className="font-semibold">
                            Category
                        </label>
                        <p>
                            {product?.book
                                ?.category || "-"}
                        </p>
                    </div>

                    <div>
                        <label className="font-semibold">
                            Commission
                        </label>
                        <p>
                            {
                                product?.commissionPercentage
                            }
                            %
                        </p>
                    </div>

                    <div>
                        <label className="font-semibold">
                            Status
                        </label>
                        <p>{product?.status}</p>
                    </div>

                    <div>
                        <label className="font-semibold">
                            Author
                        </label>
                        <p>
                            {
                                product?.author
                                    ?.firstName
                            }{" "}
                            {
                                product?.author
                                    ?.lastName
                            }
                        </p>
                    </div>

                    <div className="col-span-2">
                        <label className="font-semibold">
                            Author Email
                        </label>
                        <p>
                            {
                                product?.author
                                    ?.email
                            }
                        </p>
                    </div>
                </div>

                <div className="flex justify-end mt-5">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewModal;
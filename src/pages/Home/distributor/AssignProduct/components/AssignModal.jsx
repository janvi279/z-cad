import { toast } from "react-hot-toast";
import { useState } from "react";
import {
    assignProduct,
} from "../services/assignProductService";

const AssignModal = ({
    selectedBook,
    distributors,
    books,
    showModal,
    setShowModal,
}) => {
    console.log("🚀 ~ AssignModal ~ selectedBook:", selectedBook)
    const [formData, setFormData] =
        useState({
            distributorId: "",
            productId: "",
            authorId: "",
            commissionPercentage: 20,
        });


    const handleAssign =
        async () => {
            try {
                const payload = {
                    distributorId:
                        formData.distributorId,

                    productId:
                        formData.productId,

                    authorId:
                        formData.authorId,

                    commissionPercentage:
                        formData.commissionPercentage,
                };


                const res =
                    await assignProduct(
                        payload,
                    );

                toast.success(
                    res.data.message,
                );

                setShowModal(
                    false,
                );
            } catch (error) {
                console.log("🚀 ~ handleAssign ~ error:", error)
                toast.error(
                    error
                );
            }
        };

    if (!showModal)
        return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white p-6 rounded-xl w-[500px]">

                <h2 className="text-xl font-bold mb-4">
                    Assign Product
                </h2>

                <p className="mb-4">
                    {
                        selectedBook?.title
                    }
                </p>

                <select
                    className="w-full border p-2 rounded mb-4"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            distributorId:
                                e.target.value,
                        })
                    }
                >
                    <option>
                        Select Distributor
                    </option>

                    {distributors.map(
                        (
                            distributor,
                        ) => (
                            <option
                                key={
                                    distributor._id
                                }
                                value={
                                    distributor._id
                                }
                            >
                                {
                                    distributor.firstName
                                }{" "}
                                {
                                    distributor.lastName
                                }
                            </option>
                        ),
                    )}
                </select>
                <select
                    className="w-full border p-2 rounded mb-4"
                    value={formData.productId}
                    onChange={(e) => {

                        const selectedBook =
                            books.find(
                                (book) =>
                                    book._id ===
                                    e.target.value
                            );

                        setFormData({
                            ...formData,
                            productId:
                                e.target.value,
                            authorId:
                                selectedBook
                                    ?.authorId?._id,
                        });
                    }}
                >
                    <option value="">
                        Select Book
                    </option>

                    {books.map((book) => (
                        <option
                            key={book._id}
                            value={book._id}
                        >
                            {book.title}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    className="w-full border p-2 rounded mb-4"
                    value={
                        formData.commissionPercentage
                    }
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            commissionPercentage:
                                e.target.value,
                        })
                    }
                />

                <div className="flex justify-end gap-3">

                    <button
                        onClick={() =>
                            setShowModal(
                                false,
                            )
                        }
                    >
                        Cancel
                    </button>

                    <button
                        onClick={
                            handleAssign
                        }
                        className="bg-primary-500 text-white px-4 py-2 rounded"
                    >
                        Assign
                    </button>

                </div>

            </div>

        </div>
    );
};

export default AssignModal;
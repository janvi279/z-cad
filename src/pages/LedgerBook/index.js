import React, { useState } from 'react'
import { LuRepeat2 } from 'react-icons/lu'
import { PiMoney } from "react-icons/pi";
import Select from "react-select";

const LedgerBook = () => {
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);

    const options1 = [
        { value: "completed", label: "Completed" },
        { value: "pending", label: "Pending" },
        { value: "refunded", label: "Refunded" },
        { value: "cancelled", label: "Cancelled" },
    ];

    const options2 = [
        { value: "order", label: "Order" },
        { value: "withdrawal", label: "Withdrawal" },
        { value: "refunded", label: "Refunded" },
        { value: "partialRefunded", label: "Partial Refunded" },
        { value: "charges", label: "Charges" },
    ];

    return (
        <>
            <div className='flex items-center justify-between border-b px-4 pb-2'>
                <h1 className='text-2xl'>Ledger Book</h1>
                <div className='flex gap-2'>
                    <Select
                        options={options1}
                        placeholder="Show all..."
                        value={selectedOption1}
                        onChange={setSelectedOption1}
                    />
                    <Select
                        options={options2}
                        placeholder="Show all..."
                        value={selectedOption2}
                        onChange={setSelectedOption2}
                    />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 py-10 px-28">
                <div className="flex shadow-md rounded-lg overflow-hidden">
                    <div className="bg-primary-400 p-4 flex items-center justify-center">
                        <span className="text-white text-xl">₹</span>
                    </div>
                    <div className="bg-white p-4 flex-1">
                        <p className="text-lg font-medium">₹0.00</p>
                        <p className="text-sm text-gray-500">Total Earning</p>
                    </div>
                </div>

                <div className="flex shadow-md rounded-lg overflow-hidden">
                    <div className="bg-green-400 p-4 flex items-center justify-center">
                        <span className="text-white text-xl">
                            <PiMoney />
                        </span>
                    </div>
                    <div className="bg-white p-4 flex-1">
                        <p className="text-lg font-medium">₹0.00</p>
                        <p className="text-sm text-gray-500">Total Withdrawal</p>
                    </div>
                </div>

                <div className="flex shadow-md rounded-lg overflow-hidden">
                    <div className="bg-pink-500 p-4 flex items-center justify-center">
                        <span className="text-white text-xl">
                            <LuRepeat2 />
                        </span>
                    </div>
                    <div className="bg-white p-4 flex-1">
                        <p className="text-lg font-medium">₹0.00</p>
                        <p className="text-sm text-gray-500">Total Refund</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LedgerBook

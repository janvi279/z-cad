import { FaRegUser, FaCartPlus } from "react-icons/fa";
import { FiBox, FiClock } from "react-icons/fi";
import { useContext } from 'react';
import { AuthContext } from "../../../Context/AuthContext";

const WelcomeBox = () => {

    const { profileData } = useContext(AuthContext)

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-start gap-4">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                    {profileData?.avtar ? (
                        <img
                            src={profileData.avtar}
                            alt="Profile"
                            className="h-24 w-24 rounded-full object-cover"
                        />
                    ) : (

                        <FaRegUser className="h-8 w-8 text-gray-500" />

                    )}
                </div>

                <div className="space-y-1">
                    <h1 className="text-2xl font-medium text-sky-500">
                        Welcome to the ZCAD PUBLICATION Dashboard
                    </h1>
                    <p className="text-gray-600">{profileData?.firstName} {profileData?.lastName}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        {/* <FiClock />
                          <span>Last Login: 5:50 pm (December 27, 2024)</span>  */}
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="flex shadow-md rounded-lg overflow-hidden">
                    <div className="bg-rose-400 p-4 flex items-center justify-center">
                        <span className="text-white text-xl">₹</span>
                    </div>
                    <div className="bg-white p-4 flex-1">
                        <p className="text-lg font-medium">₹0.00</p>
                        <p className="text-sm text-gray-500">gross sales in this month</p>
                    </div>
                </div>

                <div className="flex shadow-md rounded-lg overflow-hidden">
                    <div className="bg-yellow-400 p-4 flex items-center justify-center">
                        <span className="text-white text-xl">
                            <FiBox />
                        </span>
                    </div>
                    <div className="bg-white p-4 flex-1">
                        <p className="text-lg font-medium">0 items</p>
                        <p className="text-sm text-gray-500">sold in this month</p>
                    </div>
                </div>

                <div className="flex shadow-md rounded-lg overflow-hidden">
                    <div className="bg-teal-400 p-4 flex items-center justify-center">
                        <span className="text-white text-xl">
                            <FaCartPlus />
                        </span>
                    </div>
                    <div className="bg-white p-4 flex-1">
                        <p className="text-lg font-medium">0 orders</p>
                        <p className="text-sm text-gray-500">received in this month</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeBox
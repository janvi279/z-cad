import React, { useEffect, useState } from "react";
import {
    MdPerson,
    MdEmail,
    MdPhone,
    MdVerified,
    MdPercent,
} from "react-icons/md";

import { getDistributorProfile } from "../../Home/distributor/services/distributorApi";

function DistributorProfile() {
    const [profile, setProfile] = useState(null);

    const fetchProfile = async () => {
        try {
            const res = await getDistributorProfile();
            console.log("🚀 ~ fetchProfile ~ res:", res)

            setProfile(
                res?.data?.distributor || null,
            );
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (!profile) {
        return (
            <div className="p-6">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-6">

            <div className="mb-6">
                <h2 className="text-2xl font-bold">
                    Distributor Profile
                </h2>

                <p className="text-gray-500">
                    Manage your profile details
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6">

                <div className="flex flex-col md:flex-row items-center gap-6">

                    <div className="h-28 w-28 rounded-full bg-primary-100 flex items-center justify-center">

                        <MdPerson
                            size={60}
                            className="text-primary-600"
                        />

                    </div>

                    <div>

                        <h3 className="text-2xl font-semibold">
                            {profile.firstName} {profile.lastName}
                        </h3>

                        <p className="text-gray-500">
                            Distributor Account
                        </p>

                    </div>

                </div>

                <div className="grid md:grid-cols-2 gap-5 mt-8">

                    <div className="border rounded-lg p-4">

                        <div className="flex items-center gap-3">

                            <MdEmail
                                size={22}
                                className="text-primary-500"
                            />

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Email
                                </p>

                                <h5 className="font-semibold">
                                    {profile.email}
                                </h5>
                            </div>

                        </div>

                    </div>

                    <div className="border rounded-lg p-4">

                        <div className="flex items-center gap-3">

                            <MdPhone
                                size={22}
                                className="text-primary-500"
                            />

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Phone Number
                                </p>

                                <h5 className="font-semibold">
                                    {profile.phone}
                                </h5>
                            </div>

                        </div>

                    </div>

                    <div className="border rounded-lg p-4">

                        <div className="flex items-center gap-3">

                            <MdVerified
                                size={22}
                                className="text-green-500"
                            />

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Status
                                </p>

                                <h5 className="font-semibold">
                                    {profile.status}
                                </h5>
                            </div>

                        </div>

                    </div>

                    <div className="border rounded-lg p-4">

                        <div className="flex items-center gap-3">

                            <MdPercent
                                size={22}
                                className="text-yellow-500"
                            />

                            <div>
                                <p className="text-gray-500 text-sm">
                                    Commission %
                                </p>

                                <h5 className="font-semibold">
                                    {profile.commissionPercentage}%
                                </h5>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DistributorProfile;
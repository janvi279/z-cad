import React, { useContext } from 'react'
import AdminDashboard from './Admin'
import AuthorDashboard from './Author'
import DistributorDashboard from './distributor'
import { AuthContext } from '../../Context/AuthContext';

const Dashboard = () => {
    const { getProfile } = useContext(AuthContext);
    const profileData = getProfile();

    return (
        <>
            {profileData?.role === "AUTHOR" && <AuthorDashboard />}

            {profileData?.role === "ADMIN" && <AdminDashboard />}
            {profileData?.role === "DISTRIBUTOR" && <DistributorDashboard />}
        </>
    )   
}

export default Dashboard

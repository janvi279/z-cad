import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const storedProfile = localStorage.getItem('_ur');
        if (storedProfile) {
            setProfileData(JSON.parse(storedProfile));
        }
    }, []);

    const saveProfile = (data) => {
        setProfileData(data);
        localStorage.setItem('_ur', JSON.stringify(data));
    };

    const removeProfile = () => {
        setProfileData(null);
        localStorage.removeItem('_ur');
    };

    const getProfile = () => {
        return profileData;
    };

    return (
        <AuthContext.Provider
            value={{
                profileData,
                saveProfile,
                removeProfile,
                getProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

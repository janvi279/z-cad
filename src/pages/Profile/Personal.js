import React, { useState, useEffect } from 'react'
import { useFormik, FormikProvider, Field } from 'formik'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import CustomFile from '../../Components/common/CustomFile'
import CustomInput from '../../Components/common/CustomInput'
import CustomTextarea from '../../Components/common/CustomTextarea'
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'
import CustomQuill from '../../Components/common/CustomQuill'

const Personal = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

   
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    
    const fetchData = async () => {
        try {
            const response = await axiosAuthInstance.get('personal-detail');
            if (response && response.status === 200) {
                const ProfileData = {
                    firstName: response.data.result.firstName,
                    lastName: response.data.result.lastName,
                    email: response.data.result.email,
                    phone: response.data.result.phone,
                    password: '',
                    about: response.data.result.about,
                };
                formik.setValues(ProfileData);
            }
        } catch (error) {
            console.error('Fetching data error:', error);
        }
    };

   
    const formik = useFormik({
        initialValues: {
           /*  avtar: '', */
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            about: '',
        },
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                const formData = new FormData();
                formData.append('firstName', values.firstName)
                formData.append('lastName', values.lastName)
                formData.append('email', values.email)
                formData.append('phone', values.phone)
                formData.append('password', values.password)
                formData.append('about', values.about)

                const response = await axiosAuthInstance.post('personal-detail/add', formData);
                if (response && response.status === 200) {
                    fetchData(); 
                }
            } catch (error) {
                console.error('Submission error:', error);
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    useEffect(() => {
        fetchData(); 
    }, []); 

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow">
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} className="space-y-4">

                    <Field
                        name="avtar"
                        label="Profile Picture"
                        component={CustomFile}
                    />

                    <Field
                        name="firstName"
                        label="First Name"
                        component={CustomInput}
                        placeholder="Enter First Name"
                    />

                    <Field
                        name="lastName"
                        label="Last Name"
                        component={CustomInput}
                        placeholder="Enter Last Name"
                    />

                    <Field
                        name="email"
                        label="Email"
                        component={CustomInput}
                        placeholder="Enter Email"
                    />

                    <Field
                        name="phone"
                        label="Phone"
                        component={CustomInput}
                        placeholder="Enter Mobile Number"
                    />
                    <div className='relative'>
                        <Field
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            component={CustomInput}
                            placeholder="Enter Password"
                        />
                        <div
                            className="absolute inset-y-0 pt-5 right-4 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </div>
                    </div>

                    <Field
                        name="about"
                        label="About"
                        component={CustomQuill}
                        placeholder="Tell us about yourself"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </FormikProvider>
        </div>
    );
}

export default Personal;

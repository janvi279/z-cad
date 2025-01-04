import React, { useState } from 'react'
import { useFormik, FormikProvider, Field } from 'formik'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import CustomFile from '../../Components/common/CustomFile'
import CustomInput from '../../Components/common/CustomInput'
import CustomTextarea from '../../Components/common/CustomTextarea'
const Personal = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const formik = useFormik({
        initialValues: {
            avtar: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            about: '',
        },
        onSubmit: async (values, { resetForm }) => {
            setIsSubmitting(true);
            try {
                resetForm();
            } catch (error) {
                console.error('Submission error:', error);
            } finally {
                setIsSubmitting(false);
            }
        },
    });

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
                        component={CustomTextarea}
                        placeholder="Tell us about yourself"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </FormikProvider>
        </div>
    )
}

export default Personal
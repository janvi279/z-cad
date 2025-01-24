import React, { useState } from 'react';
import { useFormik, FormikProvider, Field } from 'formik';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import CustomInput from '../../../Components/common/CustomInput';
import { toast } from 'react-hot-toast';
import axiosCommanInstance from '../../../utils/axios/axiosCommanInstance';
import * as  Yup from 'yup';

const validationSchema = Yup.object({
    firstName: Yup.string().trim().required("First Name is Required"),
    lastName: Yup.string().trim().required("Last Name is Required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords must match")
    .required("Confirm Password is required"),
})


const Register = () => {


    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (values) => {
        setIsSubmitting(true);
        try{
            const response = await axiosCommanInstance.post('auth/create-author', {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
            });
            toast.success(response.data?.message);
            formik.resetForm(); 
        } catch(error) {
            toast.error(error.response?.data?.message)
        } finally {
            setIsSubmitting(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, formikHelpers) => {
            const error = await formik.validateForm();
            if (Object.keys(error).length === 0) {
              handleSubmit(values, formikHelpers);
            } else {
              formikHelpers.setTouched(error);
            }
          }
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit} className="space-y-4">


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


                        <div className="relative">
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


                        <div className="relative">
                            <Field
                                name="confirmPassword"
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                component={CustomInput}
                                placeholder="Confirm Password"
                            />
                            <div
                                className="absolute inset-y-0 pt-5 right-4 flex items-center cursor-pointer"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </div>
                        </div>


                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Registring...' : 'Register'}
                        </button>
                    </form>
                </FormikProvider>
            </div>
        </div>
    );
};

export default Register;

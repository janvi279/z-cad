import React, { useState } from "react";
import { useFormik, FormikProvider, Field } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import ZCADLogo from "../../../ZCADICON.png";
import CustomInput from "../../../Components/common/CustomInput";
import axiosCommanInstance from "../../../utils/axios/axiosCommanInstance";

const validationSchema = Yup.object({
    firstName: Yup.string().trim().required("First Name is Required"),
    lastName: Yup.string().trim().required("Last Name is Required"),


    email: Yup.string()
        .email("Invalid email format")
        .required("Email is Required"),

    phone: Yup.string()
        .required("Phone Number is Required"),

    password: Yup.string()
        .required("Password is Required"),

    confirmPassword: Yup.string()
        .oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"
        )
        .required("Confirm Password is Required"),
    commissionPercentage: Yup.number()
        .required("Commission Percentage is Required")
        .min(0, "Commission Percentage cannot be less than 0")
        .max(100, "Commission Percentage cannot be greater than 100"),
});

const DistributorRegister = () => {

    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [showPassword, setShowPassword] =
        useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility =
        () => {
            setShowConfirmPassword(
                !showConfirmPassword
            );
        };

    const handleSubmit = async (
        values
    ) => {

        setIsSubmitting(true);

        try {

            const response =
                await axiosCommanInstance.post(
                    "/distributor/create",
                    {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        phone: values.phone,
                        password: values.password,
                        commissionPercentage: values.commissionPercentage
                    }
                );

            toast.success(
                response.data?.message
            );

            formik.resetForm();

            navigate(
                "/login"
            );

        } catch (error) {

            toast.error(
                error?.response?.data
                    ?.message ||
                "Something went wrong"
            );

        } finally {

            setIsSubmitting(false);

        }
    };

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            commissionPercentage: 0
        },

        validationSchema,

        onSubmit: async (
            values,
            formikHelpers
        ) => {

            const errors =
                await formik.validateForm();

            if (
                Object.keys(errors).length === 0
            ) {

                handleSubmit(values);

            } else {

                formikHelpers.setTouched(
                    errors
                );

            }
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

                <div className="flex flex-col items-center gap-6 mb-8">

                    <img
                        className="h-[80px]"
                        src={ZCADLogo}
                        alt="ZCAD Logo"
                    />

                </div>

                <h2 className="text-2xl font-semibold text-center mb-6">
                    Distributor Register
                </h2>

                <FormikProvider value={formik}>

                    <form
                        onSubmit={
                            formik.handleSubmit
                        }
                        className="space-y-4"
                    >

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
                            label="Phone Number"
                            component={CustomInput}
                            placeholder="Enter Phone Number"
                        />

                        <div className="relative">

                            <Field
                                name="password"
                                label="Password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                component={CustomInput}
                                placeholder="Enter Password"
                            />

                            <div
                                className="absolute right-4 top-11 cursor-pointer"
                                onClick={
                                    togglePasswordVisibility
                                }
                            >
                                {showPassword ? (
                                    <FiEyeOff />
                                ) : (
                                    <FiEye />
                                )}
                            </div>

                        </div>

                        <div className="relative">

                            <Field
                                name="confirmPassword"
                                label="Confirm Password"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                component={CustomInput}
                                placeholder="Confirm Password"
                            />

                            <div
                                className="absolute right-4 top-11 cursor-pointer"
                                onClick={
                                    toggleConfirmPasswordVisibility
                                }
                            >
                                {showConfirmPassword ? (
                                    <FiEyeOff />
                                ) : (
                                    <FiEye />
                                )}
                            </div>

                        </div>
                        <Field
                            name="commissionPercentage"
                            label="Commission Percentage"
                            type="number"
                            component={CustomInput}
                            placeholder="Enter Commission Percentage"
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 ${isSubmitting
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                                }`}
                        >

                            {isSubmitting
                                ? "Registering..."
                                : "Register Distributor"}

                        </button>

                    </form>

                </FormikProvider>

            </div>

        </div>
    );
};

export default DistributorRegister;
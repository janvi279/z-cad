import React, { useState } from 'react'
import { useFormik, FormikProvider, Field } from 'formik'
import CustomInput from '../../Components/common/CustomInput'
import CustomCheckbox from '../../Components/common/CustomCheckbox'
import CustomSelect from '../../Components/common/CustomSelect'

const Address = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            country: '',
            state: '',
            city: '',
            postCode: '',
            sameAsBilling: false,

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
                    <div>
                        <h3 className="text-xl text-primary-500 font-semibold">
                            Billing
                        </h3>
                        <div className="space-y-2 mt-2">
                            <Field
                                name="firstName"
                                label="First Name"
                                placeholder="Enter First Name"
                                component={CustomInput}
                            />
                            <Field
                                name="lastName"
                                label="Last Name"
                                placeholder="Enter Last Name"
                                component={CustomInput}
                            />
                            <Field
                                name="address"
                                label="Address"
                                placeholder="Enter Address"
                                component={CustomInput}
                            />
                            <Field
                                name="address2"
                                label="Address 2"
                                placeholder="Enter Address 2"
                                component={CustomInput}
                            />
                            <Field
                                name="country"
                                label="Country"
                                component={CustomSelect}
                                options={[
                                    { value: 'india', label: 'India' },

                                ]}
                            />
                            <Field
                                name="state"
                                label="State "
                                component={CustomSelect}
                                options={[
                                    { value: 'gujarat', label: 'Gujarat' },
                                ]}
                            />
                            <Field
                                name="city"
                                label="City / Town"
                                component={CustomInput}
                            />
                            <Field
                                name="postCode"
                                label="Postcode / Zip"
                                component={CustomInput}
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl text-primary-500 font-semibold">
                            Shipping
                        </h3>
                        <div className="space-y-2 mt-2">
                            <Field
                                name="sameAsBilling"
                                label="Same as Billing"
                                component={CustomCheckbox}
                            />
                        </div>
                    </div>
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

export default Address
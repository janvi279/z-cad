import React, { useState } from 'react'
import { useFormik, FormikProvider, Field } from 'formik'
import CustomInput from '../../Components/common/CustomInput'

const Social = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const formik = useFormik({
        initialValues: {
            twitter: '',
            facebook: '',
            instagram: '',
            youtube: '',
            linkedin: '',
            googlePlus: '',
            snapchat: '',
            pinterest: '',
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
                        name="twitter"
                        label="Twitter"
                        component={CustomInput}
                        placeholder="Twitter Handler"
                    />
                    <Field
                        name="facebook"
                        label="Facebook"
                        component={CustomInput}
                        placeholder="Facebook Handler"

                    />

                    <Field
                        name="instagram"
                        label="Instagram"
                        component={CustomInput}
                        placeholder="Instagram Username"
                    />

                    <Field
                        name="youtube"
                        label="Youtube"
                        component={CustomInput}
                        placeholder="Youtube ChannelName"
                    />

                    <Field
                        name="linkedin"
                        label="LinkedIn"
                        component={CustomInput}
                        placeholder="LinkedIn UserName"
                    />
                    <Field
                        name="googlePlus"
                        label="Google Plus"
                        component={CustomInput}
                        placeholder="Google Plus ID"
                    />
                    <Field
                        name="snapchat"
                        label="Snapchat"
                        component={CustomInput}
                        placeholder="Snapchat ID"
                    />

                    <Field
                        name="pinterest"
                        label="Pinterest"
                        component={CustomInput}
                        placeholder="Pinterest UserName"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </FormikProvider>
        </div>
    )
}

export default Social
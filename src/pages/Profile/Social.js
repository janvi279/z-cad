import React, { useState, useEffect } from 'react'
import { useFormik, FormikProvider, Field } from 'formik'
import CustomInput from '../../Components/common/CustomInput'
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'

const Social = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const fetchData = async () => {
        try {
            const response = await axiosAuthInstance.get('personal-detail');
            if (response && response.status === 200) {
                const SocialData = {
                    twitter: response.data.result.twitter,
                    facebook: response.data.result.facebook,
                    instagram: response.data.result.instagram,
                    youtube: response.data.result.youtube,
                    linkedin: response.data.result.linkedin,
                    googlePlus: response.data.result.googlePlus,
                    snapchat: response.data.result.snapchat,
                    pinterest: response.data.result.pinterest,
                };
                formik.setValues(SocialData);
            }
        } catch (error) {
            console.error('Fetching data error:', error);
        }
    };

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
                const response = await axiosAuthInstance.post('personal-detail/social-add', values)
            
                if (response && response.status === 200){
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
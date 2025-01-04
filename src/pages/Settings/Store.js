import React, { useState } from 'react';
import { useFormik, FormikProvider, Field } from 'formik';
import CustomInput from '../../Components/common/CustomInput';
import CustomFile from '../../Components/common/CustomFile';
import CustomSelect from '../../Components/common/CustomSelect';
import CustomTextarea from '../../Components/common/CustomTextarea';
import CustomCheckbox from '../../Components/common/CustomCheckbox';
import CustomQuill from '../../Components/common/CustomQuill';

const Store = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      mobile: '',
      logo: null,
      bannerType: '',
      storeBanner: '',
      mobileBanner: '',
      videoBanner: '',
      silderBannerLink: '',
      storeListBannerType: '',
      storeListBanner: '',
      storeListVideoBanner: '',
      shopDiscription: '',
      autherNamePosition: '',
      productPerPage: '',
      hideEmail: false,
      hideMobile: false,
      hideAddress: false,
      hideMap: false,
      hideAbout: false,
    },
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        resetForm();
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const BannerTypeOptions = [
    { value: 'staticImage', label: 'Static Image' },
    { value: 'slider', label: 'Slider' },
    { value: 'video', label: 'Video' },
  ];

  const StoreListOfBannerOptions = [
    { value: 'staticImage', label: 'Static Image' },
    { value: 'video', label: 'Video' },
  ];

  const AuthorNamePositonOptions = [
    { value: 'onBanner', label: 'On Banner' },
    { value: 'atHeader', label: 'At Header' },
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* General Settings */}
          <div>
            <h2 className="text-xl text-primary-500 font-semibold">General Settings</h2>
            <div className="space-y-2 mt-2">
              <Field name="email" label="Email" component={CustomInput} placeholder="Enter email" />
              <Field name="mobile" label="Mobile No." component={CustomInput} placeholder="Enter Mobile No." />
            </div>
          </div>

          {/* Store Brand Setup */}
          <div>
            <h3 className="text-xl text-primary-500 font-semibold">Store Brand Setup</h3>
            <div className="space-y-2 mt-2">
              <Field name="logo" label="Logo" component={CustomFile} />
              <Field
                name="bannerType"
                label="Banner Type"
                component={CustomSelect}
                options={BannerTypeOptions}
              />
              <Field name="mobileBanner" label="Mobile Banner" component={CustomFile} />
              {formik.values.bannerType === 'staticImage' && (
                <Field name="storeBanner" label="Store Banner" component={CustomFile} />
              )}
              {formik.values.bannerType === 'slider' && (
                <Field name="silderBannerLink" label="Slider Banner Link" component={CustomInput} />
              )}
              {formik.values.bannerType === 'video' && (
                <Field name="videoBanner" label="Video Banner" component={CustomFile} />
              )}
              <Field
                name="storeListBannerType"
                label="Store List Banner Type"
                component={CustomSelect}
                options={StoreListOfBannerOptions}
              />
              {formik.values.storeListBannerType === 'staticImage' && (
                <Field name="storeListBanner" label="Store List Banner" component={CustomFile} />
              )}
              {formik.values.storeListBannerType === 'video' && (
                <Field name="storeListVideoBanner" label="Store List Video Banner" component={CustomFile} />
              )}
              <Field name="shopDiscription" label="Shop Description" component={CustomQuill} />
            </div>
          </div>

          {/* Store Visibility Setup */}
          <div>
            <h3 className="text-xl text-primary-500 font-semibold">Store Visibility Setup</h3>
            <div className="space-y-2 mt-2">
              <Field
                name="autherNamePosition"
                label="Author Name Position"
                component={CustomSelect}
                options={AuthorNamePositonOptions}
              />
              <Field
                name="productPerPage"
                label="Products Per Page"
                component={CustomInput}
                placeholder="Enter products per page"
              />
              <div className="space-y-2">
                <Field name="hideEmail" label="Hide Email from Store" component={CustomCheckbox} />
                <Field name="hideMobile" label="Hide Mobile No. from Store" component={CustomCheckbox} />
                <Field name="hideAddress" label="Hide Address from Store" component={CustomCheckbox} />
                <Field name="hideMap" label="Hide Map from Store" component={CustomCheckbox} />
                <Field name="hideAbout" label="Hide About From Store" component={CustomCheckbox} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </form>
      </FormikProvider>
    </div>
  );
};

export default Store;

import React, { useState } from 'react';
import { useFormik, FormikProvider, Field } from 'formik';
import Select from 'react-select';
import CustomCheckbox from '../../Components/common/CustomCheckbox';
import CustomSelect from '../../Components/common/CustomSelect';

const StoreHours = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      enableStore: false,
      disablePurchaseOffTime: false,
      setWeekOff: [], 
    },
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        console.log('Submitted Values:', values); // Log form values for debugging
        resetForm();
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const daysOfWeekOptions = [
    { label: 'Monday', value: 'monday' },
    { label: 'Tuesday', value: 'tuesday' },
    { label: 'Wednesday', value: 'wednesday' },
    { label: 'Thursday', value: 'thursday' },
    { label: 'Friday', value: 'friday' },
    { label: 'Saturday', value: 'saturday' },
    { label: 'Sunday', value: 'sunday' },
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <h2 className='text-xl text-primary-500 font-semibold'>Store Hours Setting</h2>
            <div className='space-y-2 mt-2'>
            <Field 
            name="enableStore" 
            label="Enable Store Hours" 
            component={CustomCheckbox} 
            />
            <Field 
            name="disablePurchaseOffTime" 
            label="Disable Purchase During Off Time" 
            component={CustomCheckbox} 
            />
            <Field
            name="setWeekOff"
            label="Set Week Off Days"
            component={CustomSelect}
            options={daysOfWeekOptions}
            isMulti={true}
            />
            </div>
          </div>

          <div>
          <h2 className="text-xl text-primary-500 font-semibold">Daily Basic Opening & Closing Hours</h2>
          <div className="space-y-2 mt-2">

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

export default StoreHours;

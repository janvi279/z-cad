import React, { useState } from 'react';
import { useFormik, FormikProvider, Field, FieldArray } from 'formik';
import CustomCheckbox from '../../Components/common/CustomCheckbox';
import CustomSelect from '../../Components/common/CustomSelect';

const StoreHours = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      enableStore: false,
      disablePurchaseOffTime: false,
      setWeekOff: [],
      mondayOpeningTime: [{ time: '' }],
      mondayClosingTime: [{ time: '' }],
      tuesdayOpeningTime: [{ time: '' }],
      tuesdayClosingTime: [{ time: '' }],
      wednesdayOpeningTime: [{ time: '' }],
      wednesdayClosingTime: [{ time: '' }],
      thursdayOpeningTime: [{ time: '' }],
      thursdayClosingTime: [{ time: '' }],
      fridayOpeningTime: [{ time: '' }],
      fridayClosingTime: [{ time: '' }],
      saturdayOpeningTime: [{ time: '' }],
      saturdayClosingTime: [{ time: '' }],
    },
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        console.log('Submitted Values:', values); 
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
            <h2 className="text-xl text-primary-500 font-semibold">Store Hours Setting</h2>
            <div className="space-y-2 mt-2">
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
            <h2 className="text-xl text-primary-500 font-semibold">Daily Opening & Closing Hours</h2>
            <div className="space-y-4 mt-2">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((day) => (
                <div key={day}>
                  <h3 className="text-lg font-semibold mt-4">{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                  <FieldArray name={`${day}OpeningTime`}>
                    {({ push, remove }) => (
                      <div>
                        {/* Render opening and closing times for the day */}
                        {(formik.values[`${day}OpeningTime`] || []).map((_, index) => (
                          <div key={index} className="flex gap-4 items-center border p-2 rounded-lg">
                            <div className="flex-1">
                              <label className="block text-sm font-medium">
                                {day.charAt(0).toUpperCase() + day.slice(1)} Opening
                              </label>
                              <input
                                type="time"
                                name={`${day}OpeningTime[${index}].time`}
                                value={formik.values[`${day}OpeningTime`]?.[index]?.time || ''}
                                onChange={formik.handleChange}
                                className="border rounded p-2 w-full"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium">
                                {day.charAt(0).toUpperCase() + day.slice(1)} Closing
                              </label>
                              <input
                                type="time"
                                name={`${day}ClosingTime[${index}].time`}
                                value={formik.values[`${day}ClosingTime`]?.[index]?.time || ''}
                                onChange={formik.handleChange}
                                className="border rounded p-2 w-full"
                              />
                            </div>
                            {index === 0 && (
                            <button
                              type="button"
                              onClick={() => formik.setFieldValue(`${day}OpeningTime`, [...formik.values[`${day}OpeningTime`], { time: '' }])}
                              className="text-white bg-primary-500 w-8 h-8 flex items-center justify-center rounded-full"
                            >
                              +
                            </button>
                            )}
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-white bg-red-500 w-8 h-8 flex items-center justify-center rounded-full"
                              >
                                -
                              </button>
                            )}
                          </div>
                        ))}

                      </div>
                    )}
                  </FieldArray>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </form>
      </FormikProvider>
    </div>
  );
};

export default StoreHours;

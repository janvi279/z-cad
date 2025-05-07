import React, { useState, useEffect } from 'react'
import { useFormik, FormikProvider, Field } from 'formik'
import CustomInput from '../../Components/common/CustomInput'
import CustomSelect from '../../Components/common/CustomSelect'
import { Country, State } from 'country-state-city';
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';

const Location = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);

  useEffect(() => {
    const countries = Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountryOptions(countries);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosAuthInstance.get('setting-location')
      if (response && response.status === 200) {
        const LocationData = {
          street: response.data.result.street,
          street2: response.data.result.street2,
          city: response.data.result.city,
          zip: response.data.result.zip,
          state: response.data.result.state,
          country: response.data.result.country,
          location: response.data.result.location,
        };
        formik.setValues(LocationData)
      } 
    } catch (error) {
      console.error('Fetching data error:', error)
    }
  }

  const formik = useFormik({
    initialValues: {
      street: '',
      street2: '',
      city: '',
      zip: '',
      state: '',
      country: '',
      location: '',
    },
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true)
      try {
       const response = await axiosAuthInstance.post('setting-location/add', values);
        if (response && response.status === 200) {
          fetchData();
        }
      } catch (error) {
        console.error('Submission error:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  useEffect (() => {
    fetchData();
  },[])

  useEffect(() => {
    if (formik.values.country) {
      const states = State.getStatesOfCountry(formik.values.country).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }));
      setStateOptions(states);
    }
  }, [formik.values.country])

  return (
    <div className='bg-gray-100 p-4 rounded-lg shadow'>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          {/* Store Address Section */}
          <div>
            <h3 className='text-xl text-primary-500 font-semibold'>
              Store Address
            </h3>
            <div className='space-y-2 mt-2'>
              <Field
                name='street'
                label='Street'
                placeholder="Street Address"
                component={CustomInput}
              />
              <Field
                name='street2'
                label='Street 2'
                placeholder="Apartment, suite, unit etc... (optional)"
                component={CustomInput}
              />

              <Field
                name='city'
                label='City/Town'
                component={CustomInput}
                placeholder="City / Town"
              />

              <Field
                name='zip'
                label='Postcode/Zip'
                component={CustomInput}
                placeholder="Postcode / Zip"
              />
              <Field
                name='country'
                label='Country'
                component={CustomSelect}
                options={countryOptions}
                value={formik.values.country}
                onChange={formik.handleChange}
              />
            </div>

            <Field
              name='state'
              label='State'
              component={CustomSelect}
              options={stateOptions}
              value={formik.values.state}
              onChange={formik.handleChange}
            />

          </div>

          {/* Store Location Section */}
          <div>
            <h3 className='text-xl text-primary-500 font-semibold'>
              Store Location
            </h3>
            <div className='space-y-2 mt-2'>
              <Field
                name='location'
                label='Store Location'
                placeholder="search ..."
                component={CustomInput}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
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

export default Location

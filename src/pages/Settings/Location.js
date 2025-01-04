import React, { useState } from 'react'
import { useFormik, FormikProvider, Field } from 'formik'
import CustomInput from '../../Components/common/CustomInput'
import CustomSelect from '../../Components/common/CustomSelect'

const Location = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

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
        resetForm()
      } catch (error) {
        console.error('Submission error:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
  })

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
                options={[{ value: 'india', label: 'India' }]}
              />

              <Field
                name='state'
                label='State'
                component={CustomSelect}
                options={[{ value: 'gujarat', label: 'Gujarat' }]}
              />
            </div>
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

export default Location

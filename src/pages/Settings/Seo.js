import React, { useState } from 'react'
import { useFormik, FormikProvider, Field } from 'formik'
import CustomInput from '../../Components/common/CustomInput'
import CustomFile from '../../Components/common/CustomFile'
import CustomTextarea from '../../Components/common/CustomTextarea'

const Seo = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formik = useFormik({
    initialValues: {
      seoTitle: '',
      metaDescription: '',
      metaKeyword: '',
      facebookTitle: '',
      facebookDescription: '',
      facebookImage: '',
      twitterTitle: '',
      twitterDescription: '',
      twitterImage: '',
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
          <div>
            <h3 className='text-xl text-primary-500 font-semibold'>
              General Setup
            </h3>
            <div className='space-y-2 mt-2'>
              <Field
                name='seoTitle'
                label='SEO Title'
                component={CustomInput}
              />

              <Field
                name='metaDescription'
                label='Meta Description'
                component={CustomTextarea}
              />

              <Field
                name='metaKeyword'
                label='Meta Keyword'
                component={CustomTextarea}
              />
            </div>
          </div>

          <div>
            <h3 className='text-xl text-primary-500 font-semibold'>
              Facebook Setup
            </h3>
            <div className='space-y-2 mt-2'>
              <Field
                name='facebookTitle'
                label='Facebook Title'
                component={CustomInput}
              />

              <Field
                name='facebookDescription'
                label='Facebook Description'
                component={CustomTextarea}
              />

              <Field
                name='facebookImage'
                label='Facebook Image'
                component={CustomFile}
              />
            </div>
          </div>

          <div>
            <h3 className='text-xl text-primary-500 font-semibold'>
              Twitter Setup
            </h3>
            <div className='space-y-2 mt-2'>
              <Field
                name='twitterTitle'
                label='Twitter Title'
                component={CustomInput}
              />

              <Field
                name='twitterDescription'
                label='Twitter Description'
                component={CustomTextarea}
              />

              <Field
                name='twitterImage'
                label='Twitter Image'
                component={CustomFile}
              />
            </div>
          </div>

          <button
            type='submit'
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
  )
}

export default Seo

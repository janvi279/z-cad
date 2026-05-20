import React, { useState } from 'react'
import { useFormik, FormikProvider, Field } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import CustomInput from '../../Components/common/CustomInput'
import CustomTextarea from '../../Components/common/CustomTextarea'

import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'

const BookSubmit = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // =========================================
  // BOOK CATEGORIES
  // =========================================

  const categories = [
    'Novel & Fiction',
    'Poetry',
    'Children Books',
    'Biography & Memoir',
    'Self Help',
    'Business & Finance',
    'Education & Academic',
    'Religion & Spirituality',
    'Health & Wellness',
    'Technology & Programming',
    'Motivational',
    'History',
    'Science',
    'Art & Design',
    'Comics & Graphic Novel',
    'Travel & Lifestyle',
    'Cooking & Recipes',
    'Mystery & Thriller',
    'Romance',
    'Horror',
    'Fantasy',
    'Drama',
    'Personal Development',
    'Startup & Entrepreneurship',
    'Marketing & Sales',
    'Psychology',
    'Other',
  ]

  // =========================================
  // VALIDATION
  // =========================================

  const validationSchema = Yup.object({
    title: Yup.string()
      .trim()
      .min(3, 'Book title must be at least 3 characters')
      .max(100, 'Book title is too long')
      .required('Book title is required'),

    category: Yup.string().required('Please select book category'),

    description: Yup.string()
      .trim()
      .min(20, 'Description must be at least 20 characters')
      .max(1000, 'Description is too long')
      .required('Book summary is required'),

    pdf: Yup.mixed()
      .required('Book PDF is required')
      .test('fileType', 'Only PDF file allowed', (value) => {
        if (!value) return false

        return value.type === 'application/pdf'
      })
      .test('fileSize', 'PDF size must be less than 20MB', (value) => {
        if (!value) return false

        return value.size <= 20 * 1024 * 1024
      }),

    coverImage: Yup.mixed()
      .required('Cover image is required')
      .test('fileType', 'Only JPG, PNG, WEBP images allowed', (value) => {
        if (!value) return false

        return ['image/jpeg', 'image/png', 'image/webp'].includes(value.type)
      })
      .test('fileSize', 'Image size must be less than 5MB', (value) => {
        if (!value) return false

        return value.size <= 5 * 1024 * 1024
      }),
  })

  // =========================================
  // FORMIK
  // =========================================

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      pdf: null,
      coverImage: null,
    },

    validationSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true)

        const formData = new FormData()

        formData.append('title', values.title)

        formData.append('description', values.description)

        formData.append('category', values.category)

        formData.append('pdf', values.pdf)

        formData.append('coverImage', values.coverImage)

        const res = await axiosAuthInstance.post('/book/submit', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        toast.success(res?.data?.message || 'Book submitted successfully')
        navigate('/my-books')

        resetForm()
      } catch (error) {
        console.log(error)

        toast.error(error?.response?.data?.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <div className='bg-white rounded-2xl shadow-md p-6'>
      {/* Header */}
      <div className='border-b border-gray-200 pb-4 mb-6'>
        <h2 className='text-2xl font-bold text-gray-800'>Submit New Book</h2>

        <p className='text-gray-500 mt-2 text-sm'>
          Submit your book for review, editing, and publishing process.
        </p>
      </div>

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {/* Book Title */}
            <div className='md:col-span-2'>
              <Field
                name='title'
                label='Book Title'
                placeholder='Enter your book title'
                component={CustomInput}
              />
            </div>

            {/* Categories */}
            <div className='md:col-span-2'>
              <label className='block text-sm font-semibold text-gray-700 mb-3'>
                Select Book Category
              </label>

              <div className='flex flex-wrap gap-3'>
                {categories.map((category, index) => (
                  <button
                    type='button'
                    key={index}
                    onClick={() => formik.setFieldValue('category', category)}
                    className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
                      formik.values.category === category
                        ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                        : 'bg-gray-50 text-gray-700 border-gray-300 hover:border-primary-400 hover:text-primary-500'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {formik.values.category && (
                <p className='mt-3 text-sm text-primary-600 font-medium'>
                  Selected: {formik.values.category}
                </p>
              )}

              {formik.touched.category && formik.errors.category && (
                <p className='text-red-500 text-sm mt-2'>
                  {formik.errors.category}
                </p>
              )}
            </div>

            {/* Description */}
            <div className='md:col-span-2'>
              <Field
                name='description'
                label='Book Summary'
                placeholder='Write a short summary about your book'
                component={CustomTextarea}
              />
            </div>

            {/* PDF Upload */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Upload Book PDF
              </label>

              <div
                className={`border-2 border-dashed rounded-xl p-5 bg-gray-50 transition ${
                  formik.touched.pdf && formik.errors.pdf
                    ? 'border-red-400'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                <input
                  type='file'
                  accept='.pdf'
                  onChange={(e) =>
                    formik.setFieldValue('pdf', e.target.files[0])
                  }
                  className='w-full text-sm text-gray-600'
                />

                {formik.values.pdf && (
                  <p className='mt-2 text-sm text-primary-600 font-medium'>
                    {formik.values.pdf.name}
                  </p>
                )}
              </div>

              {formik.touched.pdf && formik.errors.pdf && (
                <p className='text-red-500 text-sm mt-1'>{formik.errors.pdf}</p>
              )}
            </div>

            {/* Cover Upload */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Upload Cover Image
              </label>

              <div
                className={`border-2 border-dashed rounded-xl p-5 bg-gray-50 transition ${
                  formik.touched.coverImage && formik.errors.coverImage
                    ? 'border-red-400'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) =>
                    formik.setFieldValue('coverImage', e.target.files[0])
                  }
                  className='w-full text-sm text-gray-600'
                />

                {formik.values.coverImage && (
                  <p className='mt-2 text-sm text-primary-600 font-medium'>
                    {formik.values.coverImage.name}
                  </p>
                )}
              </div>

              {formik.touched.coverImage && formik.errors.coverImage && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.coverImage}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className='mt-8 flex justify-center'>
            <button
              type='submit'
              disabled={loading}
              className={`px-5 py-2.5 rounded-lg text-white font-medium transition ${
                loading
                  ? 'bg-primary-300 cursor-not-allowed'
                  : 'bg-primary-500 hover:bg-primary-600'
              }`}
            >
              {loading ? 'Submitting Book...' : 'Submit Book'}
            </button>
          </div>
        </form>
      </FormikProvider>
    </div>
  )
}

export default BookSubmit

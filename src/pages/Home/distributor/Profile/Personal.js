import React, { useState, useEffect } from 'react'
import { useFormik, FormikProvider, Field } from 'formik'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import CustomFile from '../../Components/common/CustomFile'
import CustomInput from '../../Components/common/CustomInput'
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance'
import CustomQuill from '../../Components/common/CustomQuill'

const Personal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const fetchData = async () => {
    try {
      const response = await axiosAuthInstance.get('personal-detail')
      if (response && response.status === 200) {
        const ProfileData = {
          avtar: response.data.result.avtar,
          firstName: response.data.result.firstName,
          lastName: response.data.result.lastName,
          email: response.data.result.email,
          phone: response.data.result.phone,
          password: '',
          about: response.data.result.about,
          middleName: response.data.result.middleName,

          petName: response.data.result.petName,

          dob: response.data.result.dob,

          gender: response.data.result.gender,

          achievement: response.data.result.achievement,

          emergencyContact: response.data.result.emergencyContact,

          emergencyContactPerson: response.data.result.emergencyContactPerson,

          relation: response.data.result.relation,
        }
        formik.setValues(ProfileData)
      }
    } catch (error) {
      console.error('Fetching data error:', error)
    }
  }

  const formik = useFormik({
    initialValues: {
      avtar: null,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      about: '',
      middleName: '',
      petName: '',
      dob: '',
      gender: '',
      achievement: '',
      emergencyContact: '',
      emergencyContactPerson: '',
      relation: '',
    },
    onSubmit: async (values) => {
      setIsSubmitting(true)
      try {
        const formData = new FormData()
        if (values.avtar) {
          formData.append('avtar', values.avtar)
        }
        formData.append('firstName', values.firstName)
        formData.append('lastName', values.lastName)
        formData.append('email', values.email)
        formData.append('phone', values.phone)
        formData.append('middleName', values.middleName)
        formData.append('petName', values.petName)
        formData.append('dob', values.dob)
        formData.append('gender',   values.gender)
        formData.append('achievement', values.achievement)
        formData.append('emergencyContact', values.emergencyContact)
        formData.append('emergencyContactPerson', values.emergencyContactPerson)
        formData.append('relation', values.relation)
        if (values.password) {
          formData.append('password', values.password)
        }
        formData.append('about', values.about)

        const response = await axiosAuthInstance.post(
          'personal-detail/add',
          formData,
        )
        if (response && response.status === 200) {
          fetchData()
        }
      } catch (error) {
        console.error('Submission error:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='bg-gray-100 p-4 rounded-lg shadow'>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <Field
            name='avtar'
            label='Profile Picture'
            component={CustomFile}
            url={formik.values.avtar}
          />
          {formik.values.avtar && typeof formik.values.avtar === 'string' && (
            <div className='mt-2'>
              <img
                src={formik.values.avtar}
                alt='Current Profile'
                className='w-32 h-32 object-contain rounded-md'
              />
            </div>
          )}
          <Field
            name='firstName'
            label='First Name'
            component={CustomInput}
            placeholder='Enter First Name'
          />
          <Field
            name='middleName'
            label='Middle Name'
            component={CustomInput}
            placeholder='Enter Middle Name'
          />
          <Field
            name='petName'
            label='Pet Name'
            component={CustomInput}
            placeholder='Enter Pet Name'
          />

          <Field
            name='dob'
            label='Date Of Birth'
            type='date'
            component={CustomInput}
          />

          <Field
            name='gender'
            label='Gender'
            component={CustomInput}
            placeholder='Male / Female'
          />

          <Field
            name='emergencyContact'
            label='Emergency Contact'
            component={CustomInput}
            placeholder='Enter Emergency Number'
          />

          <Field
            name='emergencyContactPerson'
            label='Emergency Contact Person'
            component={CustomInput}
            placeholder='Enter Person Name'
          />

          <Field
            name='relation'
            label='Relation'
            component={CustomInput}
            placeholder='Father / Brother / Wife'
          />
          <Field
            name='lastName'
            label='Last Name'
            component={CustomInput}
            placeholder='Enter Last Name'
          />

          <Field
            name='email'
            label='Email'
            component={CustomInput}
            placeholder='Enter Email'
          />

          <Field
            name='phone'
            label='Phone'
            component={CustomInput}
            placeholder='Enter Mobile Number'
          />
          <div className='relative'>
            <Field
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              component={CustomInput}
              placeholder='Set New Password - Leave Blank to Retain Current Password '
            />
            <div
              className='absolute inset-y-0 pt-5 right-4 flex items-center cursor-pointer'
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          <Field
            name='about'
            label='About'
            component={CustomQuill}
            placeholder='Tell us about yourself'
          />
          <Field
            name='achievement'
            label='Achievements'
            component={CustomQuill}
            placeholder='Enter achievements, awards, recognitions'
          />
          <button
            type='submit'
            disabled={isSubmitting}
            className={`bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </form>
      </FormikProvider>
    </div>
  )
}

export default Personal

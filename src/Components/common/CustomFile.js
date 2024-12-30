import React, { useState, useEffect } from 'react'
import { ErrorMessage } from 'formik'

const CustomFile = ({
  field,
  form: { touched, errors, setFieldValue },
  label,
  required,
  url = '',
  ...props
}) => {
  const [previewUrl, setPreviewUrl] = useState(null)
  const isInvalid = !!touched[field.name] && !!errors[field.name]

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0]
    setFieldValue(field.name, file)

    if (file && file.type.startsWith('image/')) {
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
    } else {
      setPreviewUrl(null)
    }
  }

  // Clean up the preview URL when the component unmounts or new file is selected
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  useEffect(() => {
    if (url) {
      setPreviewUrl(url)
    }
  }, [])

  return (
    <div className='w-full'>
      <h5 className='text-sm sm:text-base font-normal'>
        {label}
        {required && <span className='text-[#D34053]'>*</span>}
      </h5>
      <div
        className={`w-full border rounded-lg ${
          isInvalid ? 'border-[#D34053]' : 'border-gray-300'
        } p-[9px]`}
      >
        <input
          type='file'
          onChange={handleFileChange}
          className='w-full h-full'
          {...props}
        />
      </div>
      {previewUrl && (
        <div className='mt-2'>
          <img
            src={previewUrl}
            alt='Preview'
            className='w-32 h-32 object-contain rounded-md'
          />
        </div>
      )}
      <ErrorMessage
        name={field.name}
        component='div'
        className='text-[#D34053] text-sm sm:text-base'
      />
    </div>
  )
}

export default CustomFile

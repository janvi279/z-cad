import { ErrorMessage } from 'formik'

const CustomTextarea = ({
  field,
  form: { touched, errors },
  label,
  required,
  placeholder,
  rows,
  ...props
}) => {
  const isInvalid = !!touched[field.name] && !!errors[field.name]

  return (
    <div className='w-full'>
      <h5 className='text-sm sm:text-base font-normal'>
        {label}
        {required && <span className='text-[#D34053]'>*</span>}
      </h5>
      <textarea
        {...field}
        {...props}
        placeholder={placeholder}
        invalid={isInvalid ? 'true' : 'false'}
        className='w-full border border-gray-300 rounded-lg p-3'
        rows={rows}
      />
      <ErrorMessage
        name={field.name}
        component='div'
        className='text-[#D34053] text-sm sm:text-base'
      />
    </div>
  )
}

export default CustomTextarea

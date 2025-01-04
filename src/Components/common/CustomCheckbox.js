import { ErrorMessage } from 'formik';

const CustomCheckbox = ({
  field,
  form: { touched, errors },
  label,
  required,
  ...props
}) => {
  const isInvalid = !!touched[field.name] && !!errors[field.name];

  return (
    <div className="w-full">
      <label className="text-sm sm:text-base font-normal flex items-center">
        <input
          type="checkbox"
          {...field}
          {...props}
          className={`mr-2 h-5 w-5 ${isInvalid ? 'border-primary-500' : 'border-gray-300'} rounded-lg`}
        />
        {label}
        {required && <span className="text-[#D34053]">*</span>}
      </label>
      <ErrorMessage
        name={field.name}
        component="div"
        className="text-[#D34053] text-sm sm:text-base mt-1"
      />
    </div>
  );
};

export default CustomCheckbox;

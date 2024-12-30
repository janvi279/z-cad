import { ErrorMessage } from 'formik';
import Select from 'react-select';

const reactSelectStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: '8px',
    padding: '5px',
    boxShadow: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
};

const CustomSelect = ({
  field,
  form: { touched, errors },
  label,
  required,
  options,
  ...props
}) => {
  const isInvalid = !!touched[field.name] && !!errors[field.name];

  // Map the options to match the format expected by react-select
  const formattedOptions = options.map(option => ({
    value: option.value,
    label: option.label,
  }));

  return (
    <div className="w-full">
      <h5 className="text-sm sm:text-base font-normal">
        {label}
        {required && <span className="text-[#D34053]">*</span>}
      </h5>
      <div
        className={`relative w-full ${isInvalid ? 'border-blue-500' : 'border-gray-300'} rounded-lg`}
      >
        <Select
          {...field}
          {...props}
          options={formattedOptions}
          value={formattedOptions.find((option) => option.value == field.value)}
          onChange={(selectedOption) => field.onChange({ target: { name: field.name, value: selectedOption?.value } })}
          placeholder={`Select ${label}`}
          isClearable
          className="react-select-container rounded-lg"
          classNamePrefix="react-select"
          styles={reactSelectStyles}
        />
      </div>
      <ErrorMessage
        name={field.name}
        component="div"
        className="text-[#D34053] text-sm sm:text-base mt-1"
      />
    </div>
  );
};

export default CustomSelect;

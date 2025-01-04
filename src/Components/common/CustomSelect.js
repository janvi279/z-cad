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
  isMulti = false, 
  ...props
}) => {
  const isInvalid = !!touched[field.name] && !!errors[field.name];

 
  const formattedOptions = options.map((option) => ({
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
        className={`relative w-full ${isInvalid ? 'border-primary-500' : 'border-gray-300'} rounded-lg`}
      >
        <Select
          {...field}
          {...props}
          options={formattedOptions}
          value={isMulti
            ? formattedOptions.filter((option) => field.value.includes(option.value))
            : formattedOptions.find((option) => option.value === field.value)}
          onChange={(selectedOption) => {
            if (isMulti) {
              const values = selectedOption ? selectedOption.map((option) => option.value) : [];
              field.onChange({ target: { name: field.name, value: values } });
            } else {
              field.onChange({ target: { name: field.name, value: selectedOption?.value } });
            }
          }}
          placeholder={`Select ${label}`}
          isClearable
          isMulti={isMulti}  
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

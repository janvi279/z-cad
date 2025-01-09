import React, { useState, useEffect } from 'react';
import { useFormik, FormikProvider, Field } from 'formik';
import CustomInput from '../../Components/common/CustomInput';
import CustomCheckbox from '../../Components/common/CustomCheckbox';
import CustomSelect from '../../Components/common/CustomSelect';
import { Country, State } from 'country-state-city';

const Address = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);

  useEffect(() => {
    const countries = Country.getAllCountries().map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountryOptions(countries);
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      country: '',
      state: '',
      city: '',
      postCode: '',
      sameAsBilling: true,
      shippingFirstName: '',
      shippingLastName: '',
      shippingAddress: '',
      shippingAddress2: '',
      shippingCountry: '',
      shippingState: '',
      shippingCity: '',
      shippingPostCode: ''
    },
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        resetForm();
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (formik.values.country) {
      const states = State.getStatesOfCountry(formik.values.country).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }));
      setStateOptions(states);
    }
  }, [formik.values.country]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <h3 className="text-xl text-primary-500 font-semibold">Billing</h3>
            <div className="space-y-2 mt-2">
              <Field
                name="firstName"
                label="First Name"
                placeholder="Enter First Name"
                component={CustomInput}
              />
              <Field
                name="lastName"
                label="Last Name"
                placeholder="Enter Last Name"
                component={CustomInput}
              />
              <Field
                name="address"
                label="Address"
                placeholder="Enter Address"
                component={CustomInput}
              />
              <Field
                name="address2"
                label="Address 2"
                placeholder="Enter Address 2"
                component={CustomInput}
              />
              <Field
                name="country"
                label="Country"
                component={CustomSelect}
                options={countryOptions}
                value={formik.values.country}
                onChange={formik.handleChange}
              />
              <Field
                name="state"
                label="State"
                component={CustomSelect}
                options={stateOptions}
                value={formik.values.state}
                onChange={formik.handleChange}
              />
              <Field
                name="city"
                label="City / Town"
                component={CustomInput}
              />
              <Field
                name="postCode"
                label="Postcode / Zip"
                component={CustomInput}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl text-primary-500 font-semibold">Shipping</h3>
            <div className="space-y-2 mt-2">
              <Field
                name="sameAsBilling"
                label="Same as Billing"
                component={CustomCheckbox}
                checked={formik.values.sameAsBilling}
              />
            </div>

            {!formik.values.sameAsBilling && (
              <div className="space-y-2 mt-2">
                <Field
                  name="shippingFirstName"
                  label="First Name"
                  placeholder="Enter First Name"
                  component={CustomInput}
                />
                <Field
                  name="shippingLastName"
                  label="Last Name"
                  placeholder="Enter Last Name"
                  component={CustomInput}
                />
                <Field
                  name="shippingAddress"
                  label="Address"
                  placeholder="Enter Address"
                  component={CustomInput}
                />
                <Field
                  name="shippingAddress2"
                  label="Address 2"
                  placeholder="Enter Address 2"
                  component={CustomInput}
                />
                <Field
                  name="shippingCountry"
                  label="Country"
                  component={CustomSelect}
                  options={countryOptions}
                  value={formik.values.shippingCountry}
                  onChange={formik.handleChange}
                />
                <Field
                  name="shippingState"
                  label="State"
                  component={CustomSelect}
                  options={stateOptions}
                  value={formik.values.shippingState}
                  onChange={formik.handleChange}
                />
                <Field
                  name="shippingCity"
                  label="City / Town"
                  component={CustomInput}
                />
                <Field
                  name="shippingPostCode"
                  label="Postcode / Zip"
                  component={CustomInput}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </form>
      </FormikProvider>
    </div>
  );
};

export default Address;

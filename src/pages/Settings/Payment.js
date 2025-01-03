import React, { useState } from 'react';
import { useFormik, FormikProvider, Field } from 'formik';
import CustomInput from '../../Components/common/CustomInput';
import CustomSelect from '../../Components/common/CustomSelect';

const Payment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      paymentMethod: '',
      paypalEmail: '',
      accountName: '',
      accountNumber: '',
      bankName: '',
      bankAddress: '',
      routingNumber: '',
      iban: '',
      swiftCode: '',
      ifscCode: '',
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

  const PaymentMethodOptions = [
    { value: 'paypal', label: 'PayPal' },
    { value: 'banktransfer', label: 'Bank Transfer' },
  ];


  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
         
          <Field
            name="paymentMethod"
            label="Preferred Payment Method"
            component={CustomSelect}
            options={PaymentMethodOptions}
          />

          
          {formik.values.paymentMethod === 'paypal' && (
            <Field
              name="paypalEmail"
              label="PayPal Email"
              component={CustomInput}
            />
          )}

          
          {formik.values.paymentMethod === 'banktransfer' && (
            <div>
              <h3 className="text-xl text-primary-500 font-semibold">
                Bank Details
              </h3>
              <div className="space-y-2 mt-2">
                <Field
                  name="accountName"
                  label="Account Name"
                  placeholder="Your Bank Account Name"
                  component={CustomInput}
                />

                <Field
                  name="accountNumber"
                  label="Account Number"
                  placeholder="Your Bank Account Number"
                  component={CustomInput}
                />

                <Field
                  name="bankName"
                  label="Bank Name"
                  placeholder="Name of Bank"
                  component={CustomInput}
                />

                <Field
                  name="bankAddress"
                  label="Bank Address"
                  placeholder="Address of Your Bank"
                  component={CustomInput}
                />

                <Field
                  name="routingNumber"
                  label="Routing Number"
                  placeholder="Routing Number"
                  component={CustomInput}
                />

                <Field
                  name="iban"
                  label="IBAN"
                  placeholder="IBAN"
                  component={CustomInput}
                />

                <Field
                  name="swiftCode"
                  label="SWIFT Code"
                  placeholder="SWIFT Code"
                  component={CustomInput}
                />

                <Field
                  name="ifscCode"
                  label="IFSC Code"
                  placeholder="IFSC Code"
                  component={CustomInput}
                />
              </div>
            </div>
          )}

          
          <button
            type="submit"
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
  );
};

export default Payment;

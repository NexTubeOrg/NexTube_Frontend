import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import http_api from '../../../services/http_api';
import { handleError, handleSuccess } from '../../../common/handleError';
import { PrimaryProcessingButton } from '../../../components/common/buttons/PrimaryProcessingButton';
import { IRecoverRequest } from './types';
import { RecoverPasswordTittle } from './RecoverPasswordTitle';
import { DefaultInput } from '../../common/inputs';
import { UserIcon } from '@heroicons/react/24/outline';

const RecoverPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  const requestSchema = yup.object({
    email: yup.string().required('Enter email').email('Enter valid email'),
  });

  const onFormSubmit = async (values: IRecoverRequest) => {
    try {
      setIsLoading(true);

      await http_api.post('/api/Auth/Recover', values);
      handleSuccess('Password recovery initiated successfully');
      navigator('/auth/signin');
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: requestSchema,
    onSubmit: onFormSubmit,
  });

  const { values, errors, handleSubmit, handleChange } = formik;

  return (
    <>
      <div className="bg-white shadow-default dark:bg-body">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <div>
                <RecoverPasswordTittle />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-7">
                  <DefaultInput
                    icon={<UserIcon />}
                    displayLabel={false}
                    propertyName="email"
                    value={values.email}
                    handleChange={handleChange}
                    error={errors.email ?? ''}
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-7 flex items-center">
                  <div className="w-40">
                    <PrimaryProcessingButton
                      text="Reset"
                      type="submit"
                      isLoading={isLoading}
                    />
                  </div>
                </div>
                <div className="text-center text-white">
                  <p>
                    Already recovered?{' '}
                    <Link to="/auth/signin" className="text-primary">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecoverPassword;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';  // Додайте імпорт для useTranslation
import * as yup from 'yup';
import { useFormik } from 'formik';
import http_api from '../../../services/http_api';
import { handleError, handleSuccess } from '../../../common/handleError';
import { PrimaryProcessingButton } from '../../../components/common/buttons/PrimaryProcessingButton';
import { RecoverPasswordTitle } from './RecoverPasswordTitle';
import { DefaultInput } from '../../common/inputs';
import { UserIcon } from '@heroicons/react/24/outline';



const RecoverPassword = () => {
  const { t } = useTranslation();  // Отримайте функцію для перекладу
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  const requestSchema = yup.object({
    email: yup.string().required(t('auth.recover.emailInputLabel')).email(t('auth.recover.emailError')),
  });

  const onFormSubmit = async (values) => {
    try {
      setIsLoading(true);

      await http_api.post('/api/Auth/Recover', values);
      handleSuccess(t('auth.recover.successMessage'));
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
                <RecoverPasswordTitle />
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
                    placeholder={t('auth.recover.emailInputLabel')}
                  />
                </div>
                <div className="mb-7 flex items-center">
                  <div className="w-40">
                    <PrimaryProcessingButton
                      text={t('auth.recover.resetButton')}
                      type="submit"
                      isLoading={isLoading}
                    />
                  </div>
                </div>
                <div className="text-center text-white">
                  <p>
                    {t('auth.recover.alreadyRecoveredMessage')}
                     
                        <Link to="/auth/signin" className="text-primary">
                          {t('auth.recover.signInLinkText')}
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

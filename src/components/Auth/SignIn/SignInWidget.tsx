// src/components/Auth/SignIn/SignInWidget.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import http_api from '../../../services/http_api';
import {  storeToken, storeTokenAcount } from '../../../services/tokenService';
 
 import { handleError, handleSuccess } from '../../../common/handleError';
import { PrimaryProcessingButton } from '../../../components/common/buttons/PrimaryProcessingButton';
import { ILoginRequest, ILoginResult } from './types';
import { SignInTitle } from './SignInTitle';
import { DefaultInput } from '../../common/inputs';
import CheckboxOne from '../../CheckboxOne';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import GoogleAuthWrapper from '../Google/GoogleAuthWrapper';
import { IAuthUser } from '../../../store/reducers/auth/types';
 
import { useSelector } from 'react-redux';
 
import { useTranslation } from 'react-i18next';

const SignInWidget = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  const request: ILoginRequest = {
    email: '',
    password: '',
  };

  const requestSchema = yup.object({
    email: yup
      .string()
      .required(t('auth.signIn.emailLabel'))
      .email(t('auth.signIn.emailValidation')),
    password: yup
      .string()
      .required(t('auth.signIn.passwordLabel'))
      .min(8, t('auth.signIn.passwordMinLength')),
  });
 
  const {   isAuth } = useSelector((store: any) => store.auth as IAuthUser);
  const onFormSubmit = async (values: ILoginRequest) => {
    try {
      setIsLoading(() => true);
      const result = (
        await http_api.post<ILoginResult>('/api/auth/signin', values)
      ).data;
      if (result.result.succeeded !== true) throw result.result;

      const { token } = result;
     
      storeTokenAcount(token); 
      storeToken(token);
      handleSuccess(t('auth.signIn.loginSuccess'));
      navigator('/');
    } catch (error) {
      // handleError(error);
    } finally {
      setIsLoading(() => false);
    }
  
  };

  const formik = useFormik({
    initialValues: request,
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
              <div className="mb-5">
                <GoogleAuthWrapper
                  onLoading={() => {
                    setIsLoading(() => true);
                  }}
                ></GoogleAuthWrapper>
              </div>
              <div>
                <SignInTitle></SignInTitle>
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <DefaultInput
                    displayLabel={false}
                    propertyName="email"
                    value={values.email}
                    handleChange={handleChange}
                    error={errors.email ?? ''}
                    type="text"
                    icon={<UserIcon></UserIcon>}
                    placeholder={t('auth.signIn.emailLabel')}
                  ></DefaultInput>
                </div>

                <div className="mb-7">
                  <DefaultInput
                    icon={<LockClosedIcon></LockClosedIcon>}
                    displayLabel={false}
                    propertyName="password"
                    value={values.password}
                    handleChange={handleChange}
                    error={errors.password ?? ''}
                    type="password"
                    placeholder={t('auth.signIn.passwordLabel')}
                  ></DefaultInput>
                </div>

                <div className="mb-7 flex items-center">
                  <div className="w-40">
                    <PrimaryProcessingButton
                      onClick={() => {}}
                      text={t('auth.signIn.loginButton')}
                      type="submit"
                      isLoading={isLoading}
                    ></PrimaryProcessingButton>
                  </div>
                  <div className="ml-7 dark:hover:text-white dark:text-form-strokedark">
                    <CheckboxOne
                      text={t('auth.signIn.rememberMe')}
                      onChange={() => {}}
                    ></CheckboxOne>
                  </div>
                </div>

                <div className="text-center text-white">
                  <p>
                    {t('auth.signIn.noAccountText')}
                    <Link to="/auth/signup" className="text-primary">
                      {t('auth.signIn.signupLink')}
                    </Link>
                  </p>
                </div>

                <div className="mt-6 text-center text-white">
                  <p>
                    {t('auth.signIn.forgotPasswordText')}
                    <Link to="/auth/recover" className="text-primary">
                      {t('auth.signIn.recoverLink')}
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

export default SignInWidget;

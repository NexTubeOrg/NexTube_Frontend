// src/components/Auth/VerifyMail/index.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import http_api from '../../../services/http_api';
import { handleError, handleSuccess } from '../../../common/handleError';
import { storeToken } from '../../../services/tokenService';
import { PrimaryProcessingButton } from '../../../components/common/buttons/PrimaryProcessingButton';
import { SignUpTitle, SubTitle } from '../SignUp/SignUpTitle';
import { RegistrationInput } from '../../common/inputs';
import { useTranslation } from 'react-i18next';

interface IVerifyMailRequest {
  verificationToken: string;
  secretPhrase: string;
}

const VerifyMailWidget = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  const request: IVerifyMailRequest = {
    verificationToken: localStorage.getItem('verificationToken') || '',
    secretPhrase: '',
  };

  const requestSchema = yup.object({
    secretPhrase: yup.string().required(t('auth.verifyMail.verificationCode')),
  });

  const onFormSubmit = async (values: IVerifyMailRequest) => {
    try {
      setIsLoading(() => true);
      const result = await http_api.post('/api/Auth/VerifyUser', values);

      const { token } = result.data;
      storeToken(token);

      handleSuccess(t('auth.verifyMail.emailVerifiedSuccessfully'));
      navigator('/');
    } catch (error: any) {
      handleError(error);
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
        <div className="flex flex-wrap items-start justify-around">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2">
            <div className="w-full pb-7">
              <form onSubmit={handleSubmit}>
                <div className="flex w-full mb-7 mt-7">
                  <div className="mr-7 w-full">
                    <SignUpTitle text={t('auth.verifyMail.checkEmail')}></SignUpTitle>
                    <br />
                    <RegistrationInput
                      propertyName="secretPhrase"
                      value={values.secretPhrase}
                      handleChange={handleChange}
                      error={errors.secretPhrase ?? ''}
                      type="text"
                      labelText={t('auth.verifyMail.verificationCode')}
                    ></RegistrationInput>
                  </div>
                </div>

                <div className="mb-5 flex">
                  <div className="w-30">
                    <PrimaryProcessingButton
                      text={t('auth.verifyMail.verifyButton')}
                      type="submit"
                      isLoading={isLoading}
                      onClick={() => {}}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="pt-16">
            <AlreadyHaveAccountWidget />
          </div>
        </div>
      </div>
    </>
  );
};

const AlreadyHaveAccountWidget = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="dark:bg-boxdark w-100">
        <div className="p-7 pb-52">
          <SignUpTitle text={t('auth.verifyMail.alreadyHaveAccount.title')}></SignUpTitle>
          <SignUpTitle text={t('auth.verifyMail.alreadyHaveAccount.account')}></SignUpTitle>
          <div className="mt-7">
            <SubTitle text={t('auth.verifyMail.alreadyHaveAccount.loginEasily')}></SubTitle>
          </div>
          <div className="mt-7">
            <Link
              to={'/auth/signin'}
              className={`w-full flex items-center justify-center font-bold text-2xl py-5 cursor-pointer rounded-md border border-primary bg-primary text-white transition hover:bg-opacity-90`}
            >
              {t('auth.verifyMail.alreadyHaveAccount.signInButton')}
            </Link>
          </div>
          <div className="mt-7">
            <Link
              to={'/auth/recover'}
              className={`w-full flex items-center justify-center font-bold text-2xl py-5 cursor-pointer rounded-md border border-secondary bg-secondary text-gray transition hover:bg-opacity-90`}
            >
              {t('auth.verifyMail.alreadyHaveAccount.forgotPasswordButton')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyMailWidget;

import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import http_api from '../../../services/http_api';
import { storeToken } from '../../../services/tokenService';
import { handleError, handleSuccess } from '../../../common/handleError';
import { ModalCropper } from '../../../components/ModalCropper';
import { useState } from 'react';
import { PrimaryProcessingButton } from '../../../components/common/buttons/PrimaryProcessingButton';
import GoogleAuthWrapper from '../../../components/Auth/Google/GoogleAuthWrapper';
import { IRegistrationRequest, IRegistrationResult } from './types';
import { SignUpTitle, SubTitle } from './SignUpTitle';
import { RegistrationInput } from '../../common/inputs';

const SignUpWidget = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigator = useNavigate();


  
  const request: IRegistrationRequest = {
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    channelPhoto: null,
  };

  const requestSchema: any = yup.object({
    email: yup.string().required('Enter email').email('Enter valid email'),
    password: yup.string().required('Enter password').min(8),
    passwordConfirm: yup
      .string()
      .required('Repeat password')
      .test('equal', 'Passwords does not match', (v) => {
        return v === values.password;
      }),
    firstName: yup.string().required('Enter first name').min(2),
    lastName: yup.string().required('Enter last name').min(2),
    channelPhoto: yup.mixed().required('Image is required'),
  });

  const onFormSubmit = async (values: IRegistrationRequest) => {
    try {
      setIsLoading(() => true);
      const result = (
        await http_api.post<IRegistrationResult>('/api/auth/signup', values, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      ).data;

      const { token, verificationToken } = result;
      storeToken(token);

   
      localStorage.setItem('verificationToken', verificationToken);

      handleSuccess('User created successfully');
      
      
      navigator('/auth/verifymail');  
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(() => false);
    }
  };

  const onImageChangeHandler = (f: File) => {
    console.log('image input handle change', f);
    if (f != null) {
      onImageSaveHandler(f);
    }
  };
  const onImageSaveHandler = (file: File) => {
    console.log('image save handle', file);
    values.channelPhoto = file;
    console.log(values);
    // setDto({ ...dto, image: file });
  };

  const formik = useFormik({
    initialValues: request,
    validationSchema: requestSchema,
    onSubmit: onFormSubmit,
  });

  const { values, errors, touched, handleSubmit, handleChange } = formik;
    
  return (
    <>
      <div className="bg-white shadow-default dark:bg-body">
        <div className="flex flex-wrap items-start justify-around">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2">
            <div className="w-full pb-7">
              <div>
                <SignUpTitle text="Sign up"></SignUpTitle>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="flex w-full mb-7 mt-7">
                  <div className="relative">
                    <ModalCropper
                      onSave={onImageChangeHandler}
                      error={''}
                    ></ModalCropper>
                    {errors.channelPhoto && (
                      <div className="mt-2 text-md dark:text-danger">
                        {errors.channelPhoto}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex w-full mb-7">
                  <div className="mr-7 w-full">
                    <RegistrationInput
                      propertyName="firstName"
                      value={values.firstName}
                      handleChange={handleChange}
                      error={errors.firstName ?? ''}
                      type="text"
                      labelText="your first name"
                    ></RegistrationInput>
                  </div>
                  <div className="w-full">
                    <RegistrationInput
                      propertyName="lastName"
                      value={values.lastName}
                      handleChange={handleChange}
                      error={errors.lastName ?? ''}
                      type="text"
                      labelText="your last name"
                    ></RegistrationInput>
                  </div>
                </div>

                <div className="flex w-full mb-7">
                  <div className="w-full">
                    <RegistrationInput
                      propertyName="email"
                      value={values.email}
                      handleChange={handleChange}
                      error={errors.email ?? ''}
                      type="text"
                      labelText="your e-mail"
                    ></RegistrationInput>
                  </div>
                </div>

                <div className="flex w-full mb-7">
                  <div className="mr-7 w-full">
                    <RegistrationInput
                      propertyName="password"
                      value={values.password}
                      handleChange={handleChange}
                      error={errors.password ?? ''}
                      type="password"
                      labelText="your password"
                    ></RegistrationInput>
                  </div>
                  <div className="w-full">
                    <RegistrationInput
                      propertyName="passwordConfirm"
                      value={values.passwordConfirm}
                      handleChange={handleChange}
                      error={errors.passwordConfirm ?? ''}
                      type="password"
                      labelText="repeat password"
                    ></RegistrationInput>
                  </div>
                </div>

                <div className="mb-5 flex">
                  <div className="w-30">
                    <PrimaryProcessingButton
                      onClick={() => {}}
                      text="Sign up"
                      type="submit"
                      isLoading={isLoading}
                    ></PrimaryProcessingButton>
                  </div>

                  <div className="flex items-center ml-7">
                    <GoogleAuthWrapper
                      onLoading={() => {
                        setIsLoading(() => true);
                      }}
                    ></GoogleAuthWrapper>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="pt-16">
            <AlreadyHaveAccountWidget></AlreadyHaveAccountWidget>
          </div>
        </div>
      </div>
    </>
  );
};

const AlreadyHaveAccountWidget = () => {
  return (
    <>
      <div className="dark:bg-boxdark w-100">
        <div className="p-7 pb-52">
          <SignUpTitle text="Already have"></SignUpTitle>
          <SignUpTitle text="account?"></SignUpTitle>
          <div className="mt-7">
            <SubTitle text="You can login easily"></SubTitle>
          </div>
          <div className="mt-7">
            <Link
              to={'/auth/signin'}
              className={`w-full flex items-center justify-center font-bold text-2xl py-5 cursor-pointer rounded-md border border-primary bg-primary text-white transition hover:bg-opacity-90`}
            >
              Sign in
            </Link>
          </div>
          <div className="mt-7">
            <Link
              to={'/auth/recover'}
              className={`w-full flex items-center justify-center font-bold text-2xl py-5 cursor-pointer rounded-md border border-secondary bg-secondary text-gray transition hover:bg-opacity-90`}
            >
              Forgot password
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpWidget;

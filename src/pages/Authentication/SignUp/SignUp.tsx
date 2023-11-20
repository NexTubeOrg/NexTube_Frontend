import { Link, useNavigate } from 'react-router-dom';
import { IRegistrationRequest, IRegistrationResult } from './types';
import * as yup from 'yup';
import { useFormik } from 'formik';
import http_api from '../../../services/http_api';
import { storeToken } from '../../../services/tokenService';
import classNames from 'classnames';
import GoogleAuth from '../../../components/Auth/Google/GoogleAuth';
import { handleError, handleSuccess } from '../../../common/handleError';
import { ModalCropper } from '../../../components/ModalCropper';
import { useState } from 'react';
import { PrimaryProcessingButton } from '../../../components/common/buttons/PrimaryProcessingButton';

const SignUp = () => {
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

  const requestSchema = yup.object({
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
      console.log(errors);
      console.log(values);
      setIsLoading(() => true);
      const result = (
        await http_api.post<IRegistrationResult>('/api/auth/signup', values, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      ).data;

      const { token } = result;
      storeToken(token);
      handleSuccess('User created successfully');
      navigator('/');
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
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to NexTube
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="firstName"
                    className="mb-2.5 block font-medium text-black dark:text-white"
                  >
                    First Name
                  </label>

                  <div className="relative">
                    <input
                      id="firstName"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter your first name"
                      className={classNames(
                        'w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary',
                        {
                          'dark:border-danger dark:text-danger':
                            errors.firstName,
                        },
                      )}
                    />
                    {errors.firstName && (
                      <div className="mt-2 text-md dark:text-danger">
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="mb-2.5 block font-medium text-black dark:text-white"
                  >
                    Last Name
                  </label>

                  <div className="relative">
                    <input
                      id="lastName"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter your last name"
                      className={classNames(
                        'w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary',
                        {
                          'dark:border-danger dark:text-danger':
                            errors.lastName,
                        },
                      )}
                    />
                    {errors.lastName && (
                      <div className="mt-2 text-md dark:text-danger">
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter your email"
                      className={classNames(
                        'w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary',
                        {
                          'dark:border-danger dark:text-danger': errors.email,
                        },
                      )}
                    />
                    {errors.email && (
                      <div className="mt-2 text-md dark:text-danger">
                        {errors.email}
                      </div>
                    )}

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      type="password"
                      placeholder="Enter your password"
                      className={classNames(
                        'w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary',
                        {
                          'dark:border-danger dark:text-danger':
                            errors.password,
                        },
                      )}
                    />
                    {errors.password && (
                      <div className="mt-2 text-md dark:text-danger">
                        {errors.password}
                      </div>
                    )}

                    <span className="absolute right-4 top-4">
                      <span className="absolute right-4 top-4">
                        {/* insert here svg */}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Re-type Password
                  </label>
                  <div className="relative">
                    <input
                      id="passwordConfirm"
                      name="passwordConfirm"
                      value={values.passwordConfirm}
                      onChange={handleChange}
                      type="password"
                      placeholder="Re-enter your password"
                      className={classNames(
                        'w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary',
                        {
                          'dark:border-danger dark:text-danger':
                            errors.passwordConfirm,
                        },
                      )}
                    />
                    {errors.passwordConfirm && (
                      <div className="mt-2 text-md dark:text-danger">
                        {errors.passwordConfirm}
                      </div>
                    )}

                    <span className="absolute right-4 top-4">
                      {/* insert here svg */}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Channel photo
                  </label>
                  <div className="relative">
                    <ModalCropper
                      onSave={onImageChangeHandler}
                      error={''}
                    ></ModalCropper>
                    {/* <CropperDialog
                      onSave={onImageChangeHandler}
                      error={''}
                    ></CropperDialog> */}
                    {errors.channelPhoto && (
                      <div className="mt-2 text-md dark:text-danger">
                        {errors.channelPhoto}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-5 w-full">
                  <PrimaryProcessingButton
                    onClick={() => {}}
                    text="Create channel"
                    type="submit"
                    isLoading={isLoading}
                  ></PrimaryProcessingButton>
                </div>

                <GoogleAuth></GoogleAuth>

                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{' '}
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

export default SignUp;

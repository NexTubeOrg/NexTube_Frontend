import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import http_api from '../../../services/http_api';
import {  storeToken, storeTokenAcount } from '../../../services/tokenService';
 
import { handleError, handleSuccess } from '../../../common/handleError';
import { useState } from 'react';
import { PrimaryProcessingButton } from '../../../components/common/buttons/PrimaryProcessingButton';
import { ILoginRequest, ILoginResult } from './types';
import { SignInTitle } from './SignInTitle';
import { DefaultInput } from '../../common/inputs';
import CheckboxOne from '../../CheckboxOne';
import { LockClosedIcon, UserIcon } from '@heroicons/react/20/solid';
import GoogleAuthWrapper from '../Google/GoogleAuthWrapper';
import { IAuthUser } from '../../../store/reducers/auth/types';
 
import { useSelector } from 'react-redux';
 

const SignInWidget = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  const request: ILoginRequest = {
    email: '',
    password: '',
  };

  const requestSchema = yup.object({
    email: yup.string().required('Enter email').email('Enter valid email'),
    password: yup.string().required('Enter password').min(8),
  });
 
  const {   isAuth } = useSelector((store: any) => store.auth as IAuthUser);
  const onFormSubmit = async (values: ILoginRequest) => {
    try {
 


      console.log(errors);
      console.log(values);
      setIsLoading(() => true);
      const result = (
        await http_api.post<ILoginResult>('/api/auth/signin', values)
      ).data;
      if (result.result.succeeded != true) throw result.result;

      const { token } = result;
     
      storeTokenAcount(token); 
      storeToken(token);
 
        handleSuccess('Sign in successfully');
        navigator('/');

      
    } catch (error) {
      console.log('signinerror', error);
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
                  ></DefaultInput>
                </div>

                <div className="mb-7 flex items-center">
                  <div className="w-40">
                    <PrimaryProcessingButton
                      onClick={() => {}}
                      text="Login"
                      type="submit"
                      isLoading={isLoading}
                    ></PrimaryProcessingButton>
                  </div>
                  <div className="ml-7 dark:hover:text-white dark:text-form-strokedark">
                    <CheckboxOne
                      text="Remember me"
                      onChange={() => {}}
                    ></CheckboxOne>
                  </div>
                </div>

                <div className="text-center text-white">
                  <p>
                    Don’t have any account?{'  '}
                    <Link to="/auth/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>

                <div className="mt-6 text-center text-white">
                  <p>
                    Forgot yur Password?{'  '}
                    <Link to="/auth/recover" className="text-primary">
                      Recover
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

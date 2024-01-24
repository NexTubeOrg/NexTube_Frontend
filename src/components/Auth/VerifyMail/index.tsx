import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import http_api from '../../../services/http_api';
import { handleError, handleSuccess } from '../../../common/handleError';
import { storeToken } from '../../../services/tokenService';
import { PrimaryProcessingButton } from '../../../components/common/buttons/PrimaryProcessingButton';
import { SignUpTitle, SubTitle } from '../SignUp/SignUpTitle';
import { RegistrationInput } from '../../common/inputs';
interface IVerifyMailRequest {
  verificationToken: string;
  secretPhrase: string;
}

const VerifyMailWidget = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigator = useNavigate();

  const request: IVerifyMailRequest = {
    verificationToken: localStorage.getItem('verificationToken') || '',
    secretPhrase: '',
  };

  const requestSchema: any = yup.object({
    secretPhrase: yup.string().required('Enter secret phrase'),
  });

  const onFormSubmit = async (values: IVerifyMailRequest) => {
    try {
      setIsLoading(() => true);
      const result = await http_api.post('/api/Auth/VerifyUser', values);

      
      const { token } = result.data;
      storeToken(token);

      handleSuccess('Email verified successfully');
      
      
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

  const { values, errors, touched, handleSubmit, handleChange } = formik;

  return (
    <>
      <div className="bg-white shadow-default dark:bg-body">
        <div className="flex flex-wrap items-start justify-around">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2">
            <div className="w-full pb-7">
              <form onSubmit={handleSubmit}>
                <div className="flex w-full mb-7 mt-7">
                  <div className="mr-7 w-full">
                  <SignUpTitle text="Check your email 📧"></SignUpTitle>
                  <br/>
                     <RegistrationInput
                      propertyName="secretPhrase"
                      value={values.secretPhrase}
                      handleChange={handleChange}
                      error={errors.secretPhrase ?? ''}
                      type="text"
                      labelText="verification code"
                    ></RegistrationInput>
                  </div>
                </div>

                <div className="mb-5 flex">
                  <div className="w-30">
                    <PrimaryProcessingButton
                      text="Verify"
                      type="submit"
                      isLoading={isLoading} onClick={()=>{}}                    />
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

export default VerifyMailWidget;

import React, { useEffect, useRef } from 'react';
import {
  GoogleCredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from '@react-oauth/google';
import { storeToken } from '../services/tokenService';
import { useNavigate } from 'react-router-dom';
import http_api from '../services/http_api';
import { ILoginResult } from '../pages/Authentication/SignIn/types';
import { APP_CONFIG } from '../env';
import useColorMode from '../hooks/useColorMode';
import { handleError } from '../common/handleError';

const GoogleAuth = () => {
  const navigator = useNavigate();
  const [colorMode] = useColorMode();
  const responseGoogle = async (response: GoogleCredentialResponse) => {
    try {
      // Handle the response from Google Authentication here
      console.log('google auth', response);

      var result = (
        await http_api.post<ILoginResult>('/api/auth/SignInWithProviderToken', {
          provider: 'google',
          providerToken: response.credential ?? '',
        })
      ).data;

      console.log('api auth', result);

      if (result.result.succeeded != true) throw result.result.errors;

      const { token } = result;
      storeToken(token);
      navigator('/');
    } catch (errors) {
      let e: string[] | string;
      e = errors as string[];
      console.log('Axios send error', e);
      // setErrorMessage(e.join('\n'));
    }
  };

  return (
    <div>
      <GoogleOAuthProvider clientId={APP_CONFIG.GOOGLE_CLIENT_ID}>
        <div
          className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4  dark:border-strokedark dark:bg-meta-4
        "
        >
          <div className="">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => {
                console.log('oauth err');
                handleError('Failed to sign in with Google');
              }}
              width={'100%'}
              shape={'pill'}
              theme={colorMode == 'dark' ? 'filled_black' : 'filled_blue'}
            />
          </div>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleAuth;

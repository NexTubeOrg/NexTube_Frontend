import React, { EventHandler, useEffect, useRef } from 'react';
import {
  GoogleCredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from '@react-oauth/google';
import { storeToken } from '../../../services/tokenService';
import { useNavigate } from 'react-router-dom';
import http_api from '../../../services/http_api';
import { ILoginResult } from '../SignIn/types';
import { APP_CONFIG } from '../../../env';
import useColorMode from '../../../hooks/useColorMode';
import { handleError } from '../../../common/handleError';
import { BsGoogle } from 'react-icons/bs';

const GoogleAuth = (props: { onLoading: EventHandler<any> }) => {
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
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
      responseGoogle(credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
    cancel_on_tap_outside: false,
  });
  return (
    <>
      <button>
        <BsGoogle className="w-8 h-8 text-secondary"></BsGoogle>
      </button>
    </>
  );
};

export default GoogleAuth;

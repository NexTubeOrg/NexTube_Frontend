import React from 'react';
import {
  GoogleCredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from '@react-oauth/google';
import { storeToken } from '../services/tokenService';
import { useNavigate } from 'react-router-dom';
import http_api from '../services/http_api';
import { ILoginResult } from '../pages/Authentication/SignIn/types';

const GoogleAuth = () => {
  const navigator = useNavigate();

  const responseGoogle = async (response: GoogleCredentialResponse) => {
    try {
      // Handle the response from Google Authentication here
      console.log('google auth', response);
      storeToken(response.credential ?? '');
      navigator('/');

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
      <GoogleOAuthProvider clientId="1020050247777-8b9ibr89425mdnjv8h06jbqdsmrn0bau.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => {
            console.log('oauth err');
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleAuth;

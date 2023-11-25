import { GoogleOAuthProvider } from '@react-oauth/google';
import { APP_CONFIG } from '../../../env';
import GoogleAuth from './GoogleAuth';
import { EventHandler } from 'react';

const GoogleAuthWrapper = (props: { onLoading: EventHandler<any> }) => {
  return (
    <div className="">
      <GoogleOAuthProvider clientId={APP_CONFIG.GOOGLE_CLIENT_ID}>
        <GoogleAuth onLoading={props.onLoading}></GoogleAuth>
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleAuthWrapper;

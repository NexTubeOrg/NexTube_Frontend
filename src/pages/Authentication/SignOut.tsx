import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../services/tokenService';
import { useEffect } from 'react';

const SignOut = () => {
  const navigator = useNavigate();
  useEffect(() => {
    removeToken();
    navigator('/');
    console.log('signed out');
  });
  return <></>;
};
export default SignOut;

import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../services/tokenService';
import { useEffect } from 'react';
import { store } from '../../store';
import { ProfileVideosReducerActionsType } from '../../store/reducers/profileVideos/types';

const SignOut = () => {
  const navigator = useNavigate();
  useEffect(() => {
    removeToken();
    navigator('/');
    
    store.dispatch({
      type: ProfileVideosReducerActionsType.CLEAR_PROFILE_VIDEO_STORE,
    });

    console.log('signed out');
  }, []);
  return <></>;
};
export default SignOut;

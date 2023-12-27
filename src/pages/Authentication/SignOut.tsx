import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../services/tokenService';
import { useEffect } from 'react';
import { ProfileVideosReducerActionsType } from '../../store/reducers/profileVideos/types';
import { store } from '../../store';
import { ProfilePlaylistsActionType } from '../../store/reducers/profilePlaylists/types';

const SignOut = () => {
  const navigator = useNavigate();
  useEffect(() => {
    removeToken();
    navigator('/');

    store.dispatch({
      type: ProfileVideosReducerActionsType.CLEAR_PROFILE_VIDEO_STORE,
    });

    store.dispatch({
      type: ProfilePlaylistsActionType.RESET_ALL,
    });
    console.log('signed out');
  }, []);
  return <></>;
};
export default SignOut;

import { useNavigate } from 'react-router-dom';
import { removeToken, removeallTokens } from '../../services/tokenService';
import { useEffect } from 'react';
import { ProfileVideosReducerActionsType } from '../../store/reducers/profileVideos/types';
import { store } from '../../store';
import { AcountSwitchActionType } from '../../store/reducers/acountSwitch/types';
import { ProfilePlaylistsActionType } from '../../store/reducers/profilePlaylists/types';
import { NotificationType } from '../../store/reducers/notifications/types';
import { SubscriptionReducerActionsType } from '../../store/reducers/subscription/types';

const SignOut = () => {
  const navigator = useNavigate();
  useEffect(() => {
    removeToken();
    removeallTokens();
    navigator('/');

    store.dispatch({
      type: ProfileVideosReducerActionsType.CLEAR_PROFILE_VIDEO_STORE,
    });

    store.dispatch({
      type: ProfilePlaylistsActionType.RESET_ALL,
    });
    store.dispatch ({
      type:AcountSwitchActionType.CLEAR_TOKENS,
    });
    store.dispatch ({
      type:SubscriptionReducerActionsType.CLEAR_SUBSCRIPTION,
    });
    store.dispatch({
      type: NotificationType.RESET_NOTIFICATIONS,
    });
    console.log('signed out');
  }, []);
  return <></>;
};
export default SignOut;

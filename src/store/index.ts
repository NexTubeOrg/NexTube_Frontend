import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { AuthReducer } from './reducers/auth/AuthReducer';
import { NotificationReducer } from './reducers/notifications/NotificationReducer';
import { VideoCommentsReducer } from './reducers/videoComments/VideoCommentsReducer';
import { SubscriptionReducer } from './reducers/subscription/SubscriptionReducer';
import { AcountSwitch } from './reducers/acountSwitch/AcountSwitch';
import { ProfileVideosReducer } from './reducers/profileVideos/ProfileVideosReducer';

export const rootReducer = combineReducers({
  auth: AuthReducer,
  notify: NotificationReducer,
  videoComments: VideoCommentsReducer,
  subscription:SubscriptionReducer,
  profileVideos: ProfileVideosReducer,
  acountSwitch:AcountSwitch,
});
 

export type RootState = ReturnType<typeof rootReducer>;
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [thunk],
});

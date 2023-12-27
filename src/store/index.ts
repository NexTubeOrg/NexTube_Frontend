import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { AuthReducer } from './reducers/auth/AuthReducer';
import { NotificationReducer } from './reducers/notifications/NotificationReducer';
import { VideoCommentsReducer } from './reducers/videoComments/VideoCommentsReducer';
import { ProfileVideosReducer } from './reducers/profileVideos/ProfileVideosReducer';
import { ProfilePlaylistsReducer } from './reducers/profilePlaylists/ProfilePlaylistsReducer';

export const rootReducer = combineReducers({
  auth: AuthReducer,
  notify: NotificationReducer,
  videoComments: VideoCommentsReducer,
  profileVideos: ProfileVideosReducer,
  profilePlaylists: ProfilePlaylistsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [thunk],
});

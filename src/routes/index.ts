import { lazy } from 'react';
import { ChannelHome } from '../components/Channel/Routes/Home';
import { ChannelVideos } from '../components/Channel/Routes/Videos';
import { ChannelLive } from '../components/Channel/Routes/Live';
import { ChannelCommunity } from '../components/Channel/Routes/Community';
import { ChannelPlaylist } from '../components/Channel/Routes/Playlist';
import { ProfileBranding } from '../components/Profile/Routes/Branding';
import { ProfileInfo } from '../components/Profile/Routes/Info';
import { ProfileVideos } from '../components/Profile/Routes/Videos';
import { AddVideoOverlay } from '../components/Profile/Routes/Videos/AddVideoOverlay';
import { EditVideoOverlay } from '../components/Profile/Routes/Videos/EditVideoOverlay';
import { EditPlaylists } from '../components/Profile/Routes/Playlists/EditPlaylists';
import { CreatePlaylistOverlay } from '../components/Profile/Routes/Playlists/CreatePlaylistOverlay';
import { t } from 'i18next';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const coreRoutes = [
  {
    path: 'calendar',
    title: () => {
      return t('routes.calendar');
    },
    component: Calendar,
  },
  {
    path: 'forms/form-elements',
    title: () => {
      return t('routes.formElements');
    },
    component: FormElements,
  },
  {
    path: 'forms/form-layout',
    title: () => {
      return t('routes.formLayouts');
    },
    component: FormLayout,
  },
  {
    path: 'tables',
    title: () => {
      return t('routes.tables');
    },
    component: Tables,
  },
  {
    path: 'settings',
    title: () => {
      return t('routes.settings');
    },
    component: Settings,
  },
  {
    path: 'chart',
    title: () => {
      return t('routes.chart');
    },
    component: Chart,
  },
  {
    path: 'ui/alerts',
    title: () => {
      return t('routes.alerts');
    },
    component: Alerts,
  },
  {
    path: 'ui/buttons',
    title: () => {
      return t('routes.buttons');
    },
    component: Buttons,
  },
];

const channelRoutes = [
  {
    path: 'home',
    title: () => {
      return t('routes.home');
    },
    component: ChannelHome,
    index: true,
  },
  {
    path: 'videos',
    title: () => {
      return t('routes.videos');
    },
    component: ChannelVideos,
    index: false,
  },
  {
    path: 'live',
    title: () => {
      return t('routes.live');
    },
    component: ChannelLive,
    index: false,
    enabled: false,
  },
  {
    path: 'community',
    title: () => {
      return t('routes.community');
    },
    component: ChannelCommunity,
    index: false,
    enabled: false,
  },
  {
    path: 'playlists',
    title: () => {
      return t('routes.playlists');
    },
    component: ChannelPlaylist,
    index: false,
  },
];

const profileRoutes = [
  {
    path: '',
    title: () => {
      return t('routes.branding');
    },
    component: ProfileBranding,
    index: true,
  },
  {
    path: 'info',
    title: () => {
      return t('routes.basicInfo');
    },
    component: ProfileInfo,
    index: false,
  },
  {
    path: 'videos',
    title: () => {
      return t('routes.videos');
    },
    component: ProfileVideos,
    routes: [
      {
        path: 'addVideo',
        title: () => {
          return t('routes.addVideo');
        },
        component: AddVideoOverlay,
      },
      {
        path: 'editVideo/:id',
        title: () => {
          return t('routes.editVideo');
        },
        component: EditVideoOverlay,
      },
    ],
    index: false,
  },
  {
    path: 'playlists',
    title: () => {
      return t('routes.editPlaylist');
    },
    component: EditPlaylists,
    routes: [
      {
        path: 'addPlaylist',
        title: () => {
          return t('routes.addPlaylist');
        },
        component: CreatePlaylistOverlay,
      },
    ],
    index: false,
  },
];

const recommendationVideosRoutes = [
  {
    path: '',
    title: () => {
      return t('routes.all');
    },
    component: null,
    index: true,
    enabled: true,
  },
  {
    path: 'gaming',
    title: () => {
      return t('routes.gaming');
    },
    component: null,
    index: false,
    enabled: false,
  },
  {
    path: 'music',
    title: () => {
      return t('routes.music');
    },
    component: null,
    index: false,
    enabled: false,
  },
  {
    path: 'history',
    title: () => {
      return t('routes.history');
    },
    component: null,
    index: false,
    enabled: false,
  },
  {
    path: 'news',
    title: () => {
      return t('routes.news');
    },
    component: null,
    index: false,
    enabled: false,
  },
];

const routes = [...coreRoutes];
export default routes;
export { channelRoutes, profileRoutes, recommendationVideosRoutes };

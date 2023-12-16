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
import { EditPlaylists } from '../components/Profile/Routes/Playlists/EditPlaylists';

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
    title: 'Calender',
    component: Calendar,
  },
  {
    path: 'forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: 'forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: 'tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: 'settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: 'chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: 'ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: 'ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const channelRoutes = [
  {
    path: 'home',
    title: 'Home',
    component: ChannelHome,
    index: true,
  },
  {
    path: 'videos',
    title: 'Videos',
    component: ChannelVideos,
    index: false,
  },
  {
    path: 'live',
    title: 'Live',
    component: ChannelLive,
    index: false,
  },
  {
    path: 'community',
    title: 'Community',
    component: ChannelCommunity,
    index: false,
  },
  {
    path: 'playlists',
    title: 'Playlists',
    component: ChannelPlaylist,
    index: false,
  },
];

const profileRoutes = [
  {
    path: '',
    title: 'Branding',
    component: ProfileBranding,
    index: true,
  },
  {
    path: 'info',
    title: 'Basic info',
    component: ProfileInfo,
    index: false,
  },
  {
    path: 'videos',
    title: 'Videos',
    component: ProfileVideos,
    routes: [
      { path: 'addVideo', title: 'Add video', component: AddVideoOverlay },
    ],
    index: false,
  },
  {
    path: 'playlists',
    title: 'Playlists',
    component: EditPlaylists,
    index: false,
  },
];

const routes = [...coreRoutes];
export default routes;
export { channelRoutes, profileRoutes };

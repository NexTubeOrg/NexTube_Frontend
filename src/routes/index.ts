import { lazy } from 'react';
import { ChannelHome } from '../components/Channel/Routes/Home';
import { ChannelVideos } from '../components/Channel/Routes/Videos';
import { ChannelLive } from '../components/Channel/Routes/Live';
import { ChannelCommunity } from '../components/Channel/Routes/Community';
import { ChannelPlaylist } from '../components/Channel/Routes/Playlist';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
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
    path: 'profile',
    title: 'Profile',
    component: Profile,
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
  },
  {
    path: 'videos',
    title: 'Videos',
    component: ChannelVideos,
  },
  {
    path: 'live',
    title: 'Live',
    component: ChannelLive,
  },
  {
    path: 'community',
    title: 'Community',
    component: ChannelCommunity,
  },
  {
    path: 'playlists',
    title: 'Playlists',
    component: ChannelPlaylist,
  },
];

const routes = [...coreRoutes];
export default routes;
export { channelRoutes };

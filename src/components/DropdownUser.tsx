import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IAuthUser, IUser } from '../store/reducers/auth/types';
import {
  Roles,
  decodeToken,
  getTokenByKey,
  getTokensFromLocalStorage,
  storeToken,
  isAdmin,
  isUnverified,
  isMod,
} from '../services/tokenService';

import { ChannelPhoto } from './ChannelPhoto';
import http_api from '../services/http_api';
import SidebarLinkGroup from './SidebarLinkGroup';
import React from 'react';
import { store } from '../store';
import { AcountSwitchActionType } from '../store/reducers/acountSwitch/types';

import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/uk';
import 'dayjs/locale/es';
import {
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  LanguageIcon,
  MapPinIcon,
  UserGroupIcon,
  UserIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

interface UserSidebarProps {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg: boolean) => void;
}
const DropdownUser = ({ sidebarOpen, setSidebarOpen }: UserSidebarProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);
  const [userData, setUserData] = useState<IUserInfo>();

  useEffect(() => {
    if (isAuth) {
      fetchData();
    }
  }, [setUserData, user]);

  const fetchData = async () => {
    try {
      const response = await http_api.get(
        `/api/User/GetUser?ChannelId=${user?.userId}`,
      );
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const changeLang = (lang: string) => {
    localStorage.setItem('defaultLanguage', lang);
    changeLanguage(lang);
    dayjs.locale(lang);
  };

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        (!dropdownOpen && !languageDropdownOpen) ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
      setLanguageDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen, languageDropdownOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if ((!dropdownOpen && !languageDropdownOpen) || keyCode !== 27) return;
      setDropdownOpen(false);
      setLanguageDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen, languageDropdownOpen]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguageDropdownOpen(false);
  };

  const location = useLocation();
  const { pathname } = location;

  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, []);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const users = useSelector((store: any) => store.acountSwitch.user);
  useEffect(() => {
    const updateTokens = () => {
      const tokens = getTokensFromLocalStorage();

      tokens.forEach(async (token) => {
        try {
          const users = decodeToken(token.value) as IUser;
          const response = (
            await http_api.get(`/api/User/GetUser?ChannelId=${users.userId}`)
          ).data;
          store.dispatch({
            type: AcountSwitchActionType.LOGIN_USER_ADD,
            payload: {
              email: users.email,
              firstName: response.firstName,
              lastName: response.lastName,
              channelPhoto: response.channelPhotoFileId,
              roles: users.roles,
              userId: users.userId,
            },
          });
        } catch (error) {
          console.error('Помилка розшифрування токена:', error);
        }
      });
    };
    updateTokens();
  }, [user]);

  return (
    <div className="relative">
      <div
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {userData?.firstName} {userData?.lastName}
          </span>
          <span className="block text-xs">
            {user?.roles?.filter((r: string) => r !== Roles.User).join(' ')}
          </span>
        </span>

        <ChannelPhoto photoFileId={userData?.channelPhotoFileId ?? ''} />

        <div className="icon w-8 relative dark:text-white">
          {dropdownOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </div>
      </div>

      {/* Dropdown Start */}
      <div
        ref={dropdown}
        className={`absolute right-0 mt-4 flex w-80 flex-col rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col h-150 gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark text-white">
          <li>
            <div className="flex items-center mb-3">
              <div className="mr-6">
                <div className="bg-primary gradient p-0.5 rounded-full">
                  <ChannelPhoto photoFileId={user?.channelPhoto ?? ''} />
                </div>
              </div>

              <div className="max-w-30">
                <span className="hidden lg:block">
                  <span className="block text-sm font-medium text-black dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="block text-xs">
                    {user?.roles?.filter((r) => r !== Roles.User).join(' ')}
                  </span>
                </span>
              </div>
            </div>
          </li>

          {isUnverified(user) && (
            <li>
              <Link
                to={`/auth/verifymail`}
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <div className="icon w-8 relative dark:text-white">
                  <EnvelopeIcon></EnvelopeIcon>
                </div>
                {t('dropdownUser.verifyMail')}
              </Link>
            </li>
          )}

          {isAdmin(user) && (
            <li>
              <Link
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                onClick={() => (window.location.href = '/admin')}
                to={`/admin`}
              >
                <div className="icon w-8 relative dark:text-white">
                  <CommandLineIcon></CommandLineIcon>
                </div>
                {t('dropdownUser.adminPanel')}
              </Link>
            </li>
          )}

          {isMod(user) && !isAdmin(user) && (
            <li>
              <Link
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                onClick={() => (window.location.href = '/moderator')}
                to={`/moderator`}
              >
                <div className="icon w-8 relative dark:text-white">
                  <CommandLineIcon></CommandLineIcon>
                </div>
                {t('dropdownUser.adminPanel')}
              </Link>
            </li>
          )}

          <li>
            <Link
              to={`/channel/${user?.userId}`}
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <div className="icon w-8 relative dark:text-white">
                <UserIcon></UserIcon>
              </div>
              {t('dropdownUser.yourChannel')}
            </Link>
          </li>

          <li>
            <div
              className="flex justify-between items-center"
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            >
              <div className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base cursor-pointer">
                <div className="icon w-8 relative dark:text-white">
                  <LanguageIcon></LanguageIcon>
                </div>
                <span>{t('dropdownUser.language')}</span>
              </div>{' '}
              <div className="icon w-8 relative dark:text-white">
                {languageDropdownOpen ? (
                  <ChevronDownIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </div>
            </div>
          </li>
          {languageDropdownOpen && (
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                onClick={() => {
                  changeLang('en');
                }}
              >
                EN
              </button>
              <button
                className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                onClick={() => {
                  changeLang('uk');
                }}
              >
                UK
              </button>
              <button
                className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                onClick={() => {
                  changeLang('de');
                }}
              >
                DE
              </button>
              <button
                className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                onClick={() => {
                  changeLang('es');
                }}
              >
                ES
              </button>
            </div>
          )}

          <li>
            <div
              className="flex justify-between items-center"
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
            >
              <div className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                <div className="icon w-8 relative dark:text-white">
                  <UserGroupIcon />
                </div>
                <span>{t('dropdownUser.switchAccount')}</span>
              </div>
              <div className="icon w-8 relative dark:text-white">
                {accountDropdownOpen ? (
                  <ChevronDownIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </div>
            </div>
          </li>
          {accountDropdownOpen && (
            <div className="scrollable-container">
              <div className="no-scrollbar flex flex-col   overflow-y-auto max-h-30">
                <ul>
                  {users.map((user: any, index: any) => (
                    <li key={index}>
                      <SidebarItem
                        active={true}
                        url={user.userId}
                        title={`${user.firstName} ${user.lastName}`}
                        icon={
                          <div className="thumb bg-danger rounded-full w-8 h-8">
                            <img
                              className="h-8 w-8 rounded-full"
                              src={`/api/Photo/GetPhotoUrl/${user.channelPhoto}/50`}
                              alt="User"
                            />
                          </div>
                        }
                      />
                    </li>
                  ))}
                  <li>
                    <Link
                      to="/auth/signin"
                      className="flex items-center gap-3.5 text-sm px-20 font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                    >
                      Sing In
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <li>
            <Link to={'#'} className="">
              <div className="flex justify-between">
                <div className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                  <div className="icon w-8 relative dark:text-white">
                    <MapPinIcon></MapPinIcon>
                  </div>
                  <span>{t('dropdownUser.location')}</span>
                </div>

                <div className="icon w-8 relative dark:text-white">
                  <ChevronRightIcon></ChevronRightIcon>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link
              to={'/auth/signout'}
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <div className="icon w-8 relative dark:text-white">
                <ArrowRightOnRectangleIcon></ArrowRightOnRectangleIcon>
              </div>
              {t('dropdownUser.signOut')}
            </Link>
          </li>

          <li>
            <div className="h-5"></div>
          </li>

          <li>
            <Link
              to={'/profile/info'}
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <div className="icon w-8 relative dark:text-white">
                <Cog6ToothIcon></Cog6ToothIcon>
              </div>
              {t('dropdownUser.settings')}
            </Link>
          </li>
        </ul>
      </div>
      {/* Dropdown End */}
    </div>
  );
};
const SidebarItem = (props: {
  url: number;
  title: string;
  icon: any;
  active: boolean;
}) => {
  const handleClick = () => {
    const url = props.url?.toString();
    const token = getTokenByKey(url) as string;
    console.log('url', url);
    storeToken(token);
    window.location.reload();
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
      >
        <div className="icon w-8 relative dark:text-white">{props.icon}</div>
        {props.title}
      </div>
    </>
  );
};
export default DropdownUser;

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IAuthUser } from '../store/reducers/auth/types';
import { Roles, isAdmin, isUnverified } from '../services/tokenService';
import { ChannelPhoto } from './ChannelPhoto';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/uk';
import 'dayjs/locale/es';
import {
  ArrowRightOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  LanguageIcon,
  MapPinIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const changeLang = (lang:string)=>{
    localStorage.setItem("defaultLanguage", lang);
    changeLanguage(lang); dayjs.locale(lang);
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

  return (
    <div className="relative">
      <div
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="block text-xs">
            {user?.roles?.filter((r: string) => r !== Roles.User).join(' ')}
          </span>
        </span>

        <ChannelPhoto photoFileId={user?.channelPhoto ?? ''} />

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
            <div className="flex justify-between items-center">
              <div
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base cursor-pointer"
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              >
                <div className="icon w-8 relative dark:text-white" >
                  <LanguageIcon></LanguageIcon>
                </div>
                <span>{t('dropdownUser.language')}</span>
               
              </div>  <div className="icon w-8 relative dark:text-white" >
                  {languageDropdownOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
                </div></div>
               </li>      
              {languageDropdownOpen && (
                <div className="flex items-center gap-3">
                  <button
                    className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                    onClick={() => {changeLang("en")} }
                  >
                    EN
                  </button>
                  <button
                    className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                    onClick={() => {changeLang("uk")}}
                  >
                    UK
                  </button>
                  <button
                    className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                    onClick={() => {changeLang("de")}}
                  >
                    DE
                  </button>
                  <button
                    className="flex items-center gap-2 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                    onClick={() => {changeLang("es")}}
                  >
                    ES
                  </button>
                </div>
              )}
           
          

          <li>
            <Link to={'#'}>
              <div className="flex justify-between">
                <div className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                  <div className="icon w-8 relative dark:text-white">
                    <UserGroupIcon></UserGroupIcon>
                  </div>
                  <span>{t('dropdownUser.switchAccount')}</span>
                </div>

                <div className="icon w-8 relative dark:text-white">
                  <ChevronRightIcon></ChevronRightIcon>
                </div>
              </div>
            </Link>
          </li>

       

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

export default DropdownUser;

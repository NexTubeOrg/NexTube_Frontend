import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IAuthUser } from '../store/reducers/auth/types';
import { Roles, isAdmin,isUnverified } from '../services/tokenService';
import { ChannelPhoto } from './ChannelPhoto';
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

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, []);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, []);

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="block text-xs">
            {/* exclude display User role */}
            {user?.roles?.filter((r) => r !== Roles.User).join(' ')}
          </span>
        </span>

        <ChannelPhoto photoFileId={user?.channelPhoto ?? ''} />

        <div className="icon w-8 relative dark:text-white">
          {dropdownOpen && <ChevronDownIcon></ChevronDownIcon>}
          {!dropdownOpen && <ChevronUpIcon></ChevronUpIcon>}
        </div>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        // onFocus={() => setDropdownOpen(true)}
        // onBlur={() => setDropdownOpen(false)}
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
                    {/* exclude display User role */}
                    {user?.roles?.filter((r) => r !== Roles.User).join(' ')}
                  </span>
                </span>
              </div>
            </div>
          </li>

 {/* unverified */}
 {isUnverified(user) && (
            <li>
              <Link
                to={`/auth/verifymail`}
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <div className="icon w-8 relative dark:text-white">
                <EnvelopeIcon></EnvelopeIcon>
                </div>
                ❗Verify Mail
              </Link>
            </li>
          )}

          {/* unverified  */}
          {isAdmin(user) && (
            <li>
              <Link
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                onClick={() => window.location.href="/admin"}
                 to={`/admin`}
              >
                <div className="icon w-8 relative dark:text-white">
                  <CommandLineIcon></CommandLineIcon>
                </div>
                Admin panel
              </Link>
            </li>
          )}

          {/* channel */}
          <li>
            <Link
              to={`/channel/${user?.userId}`}
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <div className="icon w-8 relative dark:text-white">
                <UserIcon></UserIcon>
              </div>
              Your channel
            </Link>
          </li>

          {/* Switch account */}
          <li>
            <Link to={'#'}>
              <div className="flex justify-between">
                <div className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                  <div className="icon w-8 relative dark:text-white">
                    <UserGroupIcon></UserGroupIcon>
                  </div>
                  <span>Switch account</span>
                </div>

                <div className="icon w-8 relative dark:text-white">
                  <ChevronRightIcon></ChevronRightIcon>
                </div>
              </div>
            </Link>
          </li>

          {/* Language */}
          <li>
            <Link to={'#'} className="">
              <div className="flex justify-between">
                <div className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                  <div className="icon w-8 relative dark:text-white">
                    <LanguageIcon></LanguageIcon>
                  </div>
                  <span>Language</span>
                </div>

                <div className="icon w-8 relative dark:text-white">
                  <ChevronRightIcon></ChevronRightIcon>
                </div>
              </div>
            </Link>
          </li>

          {/* location */}
          <li>
            <Link to={'#'} className="">
              <div className="flex justify-between">
                <div className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                  <div className="icon w-8 relative dark:text-white">
                    <MapPinIcon></MapPinIcon>
                  </div>
                  <span>Location</span>
                </div>

                <div className="icon w-8 relative dark:text-white">
                  <ChevronRightIcon></ChevronRightIcon>
                </div>
              </div>
            </Link>
          </li>

          {/* sign out */}
          <li>
            <Link
              to={'/auth/signout'}
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <div className="icon w-8 relative dark:text-white">
                <ArrowRightOnRectangleIcon></ArrowRightOnRectangleIcon>
              </div>
              Sign Out
            </Link>
          </li>

          {/* gap */}
          <li>
            <div className="h-5"></div>
          </li>

          {/* settings */}
          <li>
            <Link
              to={'/profile/info'}
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <div className="icon w-8 relative dark:text-white">
                <Cog6ToothIcon></Cog6ToothIcon>
              </div>
              Settings
            </Link>
          </li>
        </ul>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;

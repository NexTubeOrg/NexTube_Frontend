import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { IAuthUser, IUser } from '../store/reducers/auth/types';
import { Roles,  decodeToken,   getTokenByKey,  getTokensFromLocalStorage,  storeToken } from '../services/tokenService';
import { ChannelPhoto } from './ChannelPhoto';
import http_api from '../services/http_api';
import SidebarLinkGroup from './SidebarLinkGroup';
import React from 'react';
import { store } from '../store';
import { AcountSwitchActionType } from '../store/reducers/acountSwitch/types';
 

 
import  { isAdmin } from '../services/tokenService';
 
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
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface UserSidebarProps {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg: boolean) => void;
}
const DropdownUser = ({ sidebarOpen, setSidebarOpen }: UserSidebarProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {isAuth,   user } = useSelector((store: any) => store.auth as IAuthUser);
  const [userData, setUserData] = useState<IUserInfo>();
 
  useEffect(() => {    
  if(isAuth){  fetchData();
 }}, [ setUserData,user]);

 const fetchData = async () => {
    try {
      const response = await http_api.get(`/api/User/GetUser?ChannelId=${user?.userId}`);
      setUserData(response.data);

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
 };
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

const users = useSelector((store:any)=>store.acountSwitch.user  ); 
useEffect(() => {
  const updateTokens = () => {
    const tokens = getTokensFromLocalStorage();  
    
    tokens.forEach(async (token) => {
      try {
        const users = decodeToken(token.value)as IUser  ;
        const response = (await http_api.get(`/api/User/GetUser?ChannelId=${users.userId}`)).data;
         store.dispatch({
          type: AcountSwitchActionType.LOGIN_USER_ADD,
          payload: {
            email: users.email,
            firstName: response.firstName,
            lastName: response.lastName,
            channelPhoto: response.channelPhotoFileId,
            roles: users.roles,
            userId: users.userId,
          },});
      } catch (error) {
        console.error('Помилка розшифрування токена:', error);
      }
    });
  };
  updateTokens();
}, [user]);



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
            {userData?.firstName} {userData?.lastName}
          </span>
          <span className="block text-xs">
            {/* exclude display User role */}
            {user?.roles?.filter((r) => r !== Roles.User).join(' ')}
          </span>
        </span>

        <ChannelPhoto photoFileId={userData?.channelPhotoFileId ?? ''} />

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

          {/* admin */}
          {isAdmin(user) && (
            <li>
              <Link
                to={`/admin`}
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
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
          <div className="flex justify-between">
                   <SidebarLinkGroup activeCondition={true}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-0 font-medium text-bodydark1 duration-300 ease-in-out  ${
                          (pathname === '/auth' || pathname.includes('auth')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
            <div className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                  <div className="icon w-8 relative dark:text-white">
                    <UserGroupIcon></UserGroupIcon>
                  </div>
                  <span>Switch account</span>
                  </div>

               
           
            </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                     

                     <ul>
         {users.map((user:IUser, index:any) => (
        <li key={index}>
          <SidebarItem
            active={true}
            url={user.userId}
            title={`${user.firstName} ${user.lastName}`}
            icon={ <div className="thumb bg-danger rounded-full w-8 h-8">
            <img className="h-12 w-12 rounded-full" src={"/api/Photo/GetPhotoUrl/"+user.channelPhoto+"/50"} alt="User" />
          </div>}
          />
        </li>
      ))}
    <li >
              <Link
                to="/auth/signin"
                className="flex items-center gap-3.5 text-sm px-20 font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
                Sign In
              </Link>
      </li>
      </ul> </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Auth Pages --> */}
            
         
          <div className="icon w-8 relative dark:text-white">
                  <ChevronRightIcon></ChevronRightIcon>
                </div>
              </div> 
           
          
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
const SidebarItem = (props: {
  url: number;
  title: string;
  icon: any;
  active: boolean;
}) => {
 
  
  

  const handleClick = () => {
  const url = props.url?.toString();
  const token = getTokenByKey(url) as string ;
  console.log("url",url);
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

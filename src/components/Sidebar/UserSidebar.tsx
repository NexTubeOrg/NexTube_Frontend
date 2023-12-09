import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../images/logo/logo.svg';
import SidebarLinkGroup from '../SidebarLinkGroup';
import './style.css';
import {
  ClipboardDocumentListIcon,
  ClockIcon,
  Cog6ToothIcon,
  FaceSmileIcon,
  HandThumbUpIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/20/solid';
import http_api from '../../services/http_api';
import { IAuthUser } from '../../store/reducers/auth/types';
import { useSelector } from 'react-redux';
import SubscribeButton from '../../pages/Subscription/UpdateUser/Subscription';
 

interface UserSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const UserSidebar = ({ sidebarOpen, setSidebarOpen }: UserSidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
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

  const [subscriptions, setSubscriptions] = useState<ISubscriptionData[]>([]);
  const {   user } = useSelector((store: any) => store.auth as IAuthUser);
  useEffect(() => {
     const fetchSubscriptions = async () => {
       try {
         const response = await http_api.get(`/api/Subscription/Subscriptions?SubscribeUserTo=${user?.userId}`);
         const subscriptionsData: ISubscriptionData[] = response.data.subscriptions;
         setSubscriptions(subscriptionsData);
       } catch (error) {
         console.error(error);
       }
     };
 
     fetchSubscriptions();
  }, [user] );
   
 
  
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="mt-7 p-7">
        <NavLink
          to={'/'}
          className={`w-5/6 relative flex items-center justify-center font-bold text-2xl py-5 cursor-pointer rounded-md border border-transparent bg-primary  text-white transition hover:bg-opacity-90`}
        >
          <div className="rounded-md gradient absolute inset-0"></div>
          Home
        </NavLink>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <SidebarItem
                  active={true}
                  url="/profile"
                  title="Profile"
                  icon={<UserIcon></UserIcon>}
                ></SidebarItem>
              </li>

              <li>
                <SidebarItem
                  active={true}
                  url="/search"
                  title="Search"
                  icon={<MagnifyingGlassIcon></MagnifyingGlassIcon>}
                ></SidebarItem>
              </li>

              <li>
                <SidebarItem
                  active={false}
                  url="/friends"
                  title="Friends"
                  icon={<UsersIcon></UsersIcon>}
                ></SidebarItem>
              </li>

              <li>
                <div className="h-8"></div>
              </li>

              <li>
                <SidebarItem
                  active={false}
                  url="/library"
                  title="Library"
                  icon={<ClipboardDocumentListIcon></ClipboardDocumentListIcon>}
                ></SidebarItem>
              </li>

              <li>
                <SidebarItem
                  active={false}
                  url="/history"
                  title="History"
                  icon={<ClockIcon></ClockIcon>}
                ></SidebarItem>
              </li>

              <li>
                <SidebarItem
                  active={false}
                  url="/liked"
                  title="Liked videos"
                  icon={<HandThumbUpIcon></HandThumbUpIcon>}
                ></SidebarItem>
              </li>

              <li>
                <SidebarItem
                  active={false}
                  url="/later"
                  title="Watch later"
                  icon={<ClockIcon></ClockIcon>}
                ></SidebarItem>
              </li>

              <li>
                <div className="h-8"></div>
              </li>
            </ul>
          </div>

          <div className="sub">
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Auth Pages --> */}
              <SidebarLinkGroup activeCondition={true}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
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
                        Subscriptions
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                     

                     <ul>
                     {subscriptions.map((subscription, index) => (
        <li key={index}>
          <SidebarItem
            active={true}
            url={`/channel/${subscription.subscription.userId}`}
            title={`${subscription.subscription.firstName} ${subscription.subscription.lastName}`}
            icon={ <div className="thumb bg-danger rounded-full w-8 h-8">
            <img className="h-12 w-12 rounded-full" src={"/api/Photo/GetPhotoUrl/"+subscription.subscription.channelPhoto+"/50"} alt="User" />
          </div>}
          />
        </li>
      ))}
      </ul> </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>

          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <SidebarItem
                  active={true}
                  url="/settings"
                  title="Settings"
                  icon={<Cog6ToothIcon></Cog6ToothIcon>}
                ></SidebarItem>
              </li>

              <li>
                <SidebarItem
                  active={true}
                  url="/reports"
                  title="Report history"
                  icon={<FaceSmileIcon></FaceSmileIcon>}
                ></SidebarItem>
              </li>

              <li>
                <SidebarItem
                  active={false}
                  url="/help"
                  title="Help"
                  icon={<QuestionMarkCircleIcon></QuestionMarkCircleIcon>}
                ></SidebarItem>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

const SidebarItem = (props: {
  url: string;
  title: string;
  icon: any;
  active: boolean;
}) => {
  return (
    <>
      <NavLink
        to={props.url}
        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
      >
        <div className="icon w-8 relative dark:text-white">{props.icon}</div>
        {props.title}
      </NavLink>
    </>
  );
};

export default UserSidebar;

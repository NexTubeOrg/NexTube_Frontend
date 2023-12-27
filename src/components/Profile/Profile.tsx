import { Outlet } from 'react-router-dom';
import { Navbar } from '../common/navbars/Navbar';
import { useEffect, useState } from 'react';
import http_api from '../../services/http_api';
import { useSelector } from 'react-redux';
import { IAuthUser } from '../../store/reducers/auth/types';
import { profileRoutes } from '../../routes';

const Profile = () => {
  const [userData, setUserData] = useState<IUserInfo>();
  const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);
  useEffect(() => {
    fetchData();
  }, [setUserData]);

  const fetchData = async () => {
    try {
      const response = await http_api.get(
        `/api/User/GetUser?ChannelId=${user?.userId}`,
      );
      const data = await response.data;

      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="mt-10 mx-10">
        <div className="flex">
          {/* channel photo */}
          <div className="w-36 h-36 dark:bg-primary rounded-full p-3 mr-6">
            <img
              className=" fill-white rounded-full dark:bg-transparent"
              src={
                '/api/Photo/GetPhotoUrl/' + userData.channelPhotoFileId + '/150'
              }
              alt=""
            />
          </div>
          {/* channel info */}
          <div className="text">
            {/* Channel title */}
            <h1 className="text-white text-3xl mb-2">Your channel</h1>
            <h3 className="text-white text-xl mb-2">
              {userData.firstName + ' ' + userData.lastName}
            </h3>
          </div>
        </div>
        <div className="nav mt-6">
          <Navbar routeLength={3} refs={profileRoutes}></Navbar>
        </div>
        <div className="page mt-6">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};
export { Profile };

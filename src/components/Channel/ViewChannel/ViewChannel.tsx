import { Outlet } from 'react-router-dom';
import { PrimaryProcessingButton } from '../../common/buttons/PrimaryProcessingButton';
import { Navbar } from '../../common/navbars/Navbar';
import './styles.css';
import SubscribeButton from '../../../pages/Subscription/UpdateUser/Subscription';
import { useEffect, useState } from 'react';
import http_api from '../../../services/http_api';

const ViewChannel = () => {
interface IUserInfo
{
  lastName:string,
  firstName:string,
  nickname:string,
  description:string,
  subsciptions:number,
  video:number,
  channelPhotoFileId:string

}
  const [userData, setUserData] = useState<IUserInfo>();

 useEffect(() => {
    fetchData();
 }, []);

 const fetchData = async () => {
    try {
      const response = await http_api.get(`/api/Auth/GetUser?ChannelId=${40}`);
      const data = await response.data
      console.log("User!!!!!!",response.data);
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
      <div className="">
        <div className="absolute banner h-150 w-full bg-[url('/public/banner.jpg')] bg-cover"></div>
        <div className="absolute fade h-150 w-full radial-gradient"></div>
        <div className="absolute top-100 content font-bold p-8 w-full">
          <div className="flex">
            {/* channel photo */}
            <div className="w-36 h-36 dark:bg-primary rounded-full p-3 mr-6">
              <img
                className=" fill-white rounded-full dark:bg-transparent"
                src= {"/api/Photo/GetPhotoUrl/"+userData.channelPhotoFileId+"/150"}
                alt=""
              />
            </div>
            {/* channel info */}
            <div className="text">
              {/* Channel title */}
              <h1 className="text-white text-3xl mb-2">{userData.lastName} {userData.firstName} </h1>
              {/* Channel info */}
              <h4 className="text-gray text-md  mb-2">
                <span className="mr-4">@{userData.nickname}</span>
                <span className="mr-4">{userData.subsciptions} subscribers</span>
                <span className="">{userData.video} videos</span>
              </h4>
              {/* Channel description */}
              <h4 className="text-gray text-md  mb-2">
               {userData.description}
              </h4>
              {/* Channel links */}
              <h4 className="text-md  mb-2">
                <span>
                  <a className="mr-1 text-primary" href="#">
                    (5) I spent a day with *EMOs* - NexTube
                  </a>
                  <span className="text-white">and 2 more links</span>
                </span>
              </h4>
              {/* Subscribe to channel */}
              <div className="w-35">
              <SubscribeButton
              
              isLoading={false}
                onClick={() => {}}
               text ="Subscribe"
                type="button"
                 backgroundClassname="primary"
                subscribeId={40}
              ></SubscribeButton>
              </div>
            </div>
          </div>
          <div className="nav mt-6">
            <Navbar
              routeLength={4}
              refs={[
                { title: 'Home', url: '', index: true },
                { title: 'Videos', url: 'videos', index: false },
                { title: 'Live', url: 'live', index: false },
                { title: 'Community', url: 'community', index: false },
                { title: 'Playlists', url: 'playlists', index: false },
              ]}
            ></Navbar>
          </div>
          <div className="page mt-6">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};
export { ViewChannel };

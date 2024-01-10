import { Outlet , useParams } from 'react-router-dom';
 import { Navbar } from '../../common/navbars/Navbar';
import './styles.css';
import SubscribeButton from '../../../pages/Subscription/UpdateUser/Subscription';
import { useEffect, useState } from 'react';
import http_api from '../../../services/http_api';
import { IconedProcessingButton } from '../../common/buttons/IconedButton';
import ReportForm from '../../ReportForm';
import { FlagIcon } from '@heroicons/react/20/solid';
import { SubscriptionReducerActionsType } from '../../../store/reducers/subscription/types';
import { channelRoutes } from '../../../routes';

const ViewChannel = () => {
  const [userData, setUserData] = useState<IUserInfo>();
  const { id } = useParams();
  const parts = location.pathname.split('/');

  const [showReportForm, setShowReportForm] = useState(false);

  const handleReportClick = () => {
    setShowReportForm((prevShowReportForm) => !prevShowReportForm);
  };

  const handleReportFormClose = () => {
    setShowReportForm(false);
  };
  useEffect(() => {
    fetchData();
 },  [ userData, SubscriptionReducerActionsType.ADD_SUBSCRIBER,SubscriptionReducerActionsType.DELETE_SUBSCRIBER]);

  const fetchData = async () => {
    try {
 
      const response = await http_api.get(`/api/User/GetUser?ChannelId=${id}`);

      setUserData(response.data);

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
                src={
                  '/api/Photo/GetPhotoUrl/' +
                  userData.channelPhotoFileId +
                  '/150'
                }
                alt=""
              />
            </div>
            {/* channel info */}
            <div className="text">
              {/* Channel title */}
              <h1 className="text-white text-3xl mb-2">
                {userData.lastName} {userData.firstName}{' '}
              </h1>
              {/* Channel info */}
              <h4 className="text-gray text-md  mb-2">
                <span className="mr-4">@{userData.nickname}</span>
                <span className="mr-4">
                  {userData.subsciptions} subscribers
                </span>
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
              <div className="channel-tools">
                <div className="w-35 ">
                  <SubscribeButton
                    isLoading={false}
                    onClick={() => {}}
                    text="Subscribe"
                    type="button"
                    backgroundClassname="primary"
                    subscribeId={id}
                  ></SubscribeButton>
                </div>
                <div className="w-11 h-0 ml-4">
                  <IconedProcessingButton
                    isLoading={false}
                    onClick={handleReportClick}
                    text=""
                    type="button"
                    icon={<FlagIcon height={25} width={25} />}
                    backgroundClassname="primary"
                  ></IconedProcessingButton>
                </div>
              </div>
            </div>
          </div>
          {showReportForm && (
            <div className="report-form-overlay w-150 p-0">
              <ReportForm
                abuser={Number(parts[2])}
                videoId={null}
                onSubmitSuccess={handleReportFormClose}
              />
              <button onClick={handleReportFormClose}>Close Report Form</button>
            </div>
          )}
          {!showReportForm && (
            <div>
              <div className="nav mt-6">
                <Navbar routeLength={4} refs={channelRoutes}></Navbar>
              </div>

              <div className="page mt-6">
                <Outlet></Outlet>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export { ViewChannel };

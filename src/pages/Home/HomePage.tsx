import { useSelector } from 'react-redux';
import { ChannelPhoto } from '../../components/ChannelPhoto';
import { VideosListContainer } from '../../components/Videos/VideosListContainer';
import { IAuthUser } from '../../store/reducers/auth/types';
import { Link } from 'react-router-dom';
import { VideoCameraIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="">
          {isAuth && (
            <>
              <div className="flex">
                <div className="mr-4">
                  <ChannelPhoto photoFileId={user?.channelPhoto}></ChannelPhoto>
                </div>
                <div className="text-gray flex items-center dark:hover:text-primary duration-300 ease-in-out">
                  <Link
                    to={`/profile/videos/addVideo`}
                    className="flex items-center gap-3.5 text-sm font-medium lg:text-base"
                  >
                    <div className="icon w-8 relative">
                      <VideoCameraIcon></VideoCameraIcon>
                    </div>
                    <span className="font-bold">Create a video</span>
                  </Link>
                </div>
              </div>
            </>
          )}
          <VideosListContainer />
        </div>
      </div>
    </>
  );
};
export default HomePage;

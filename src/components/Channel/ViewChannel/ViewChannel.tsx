import { Outlet } from 'react-router-dom';
import { PrimaryProcessingButton } from '../../common/buttons/PrimaryProcessingButton';
import { Navbar } from '../../common/navbars/Navbar';
import './styles.css';

const ViewChannel = () => {
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
                src="/human.jpg"
                alt=""
              />
            </div>
            {/* channel info */}
            <div className="text">
              {/* Channel title */}
              <h1 className="text-white text-3xl mb-2">Alisa Konors</h1>
              {/* Channel info */}
              <h4 className="text-gray text-md  mb-2">
                <span className="mr-4">@alisa_Konors234e</span>
                <span className="mr-4">274K subscribers</span>
                <span className="">187 videos</span>
              </h4>
              {/* Channel description */}
              <h4 className="text-gray text-md  mb-2">
                Hello! My name is Alice, i love autumn and handmade
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
                <PrimaryProcessingButton
                  isLoading={false}
                  onClick={() => {}}
                  text="Subscribed"
                  type="button"
                ></PrimaryProcessingButton>
              </div>
            </div>
          </div>
          <div className="nav mt-6">
            <Navbar
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

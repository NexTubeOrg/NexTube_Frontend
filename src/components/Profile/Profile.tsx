import { Outlet } from 'react-router-dom';
import { PrimaryProcessingButton } from '../common/buttons/PrimaryProcessingButton';
import { Navbar } from '../common/navbars/Navbar';
import { profileRoutes } from '../../routes';

const Profile = () => {
  return (
    <>
      <div className="mt-10 mx-10">
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
            <h1 className="text-white text-3xl mb-2">Your channel</h1>
            <h3 className="text-white text-xl mb-2">Alisa Konors</h3>
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

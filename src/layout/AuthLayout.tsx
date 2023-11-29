import { Outlet, useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';
import { useEffect, useState } from 'react';
import { isSignedIn } from '../services/tokenService';
import UserSidebar from '../components/Sidebar/UserSidebar';

const AuthLayout = () => {
  const navigator = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  useEffect(() => {
    if (isSignedIn() == true) navigator('/');
  }, []);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <UserSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <AuthHeader sidebarOpen={true} setSidebarOpen={() => {}} />

          <main className="bg-body">
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;

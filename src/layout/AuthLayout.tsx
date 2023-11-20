import { Outlet, useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';
import { useEffect } from 'react';
import { isSignedIn } from '../services/tokenService';

const AuthLayout = () => {
  const navigator = useNavigate();

  useEffect(() => {
    if (isSignedIn() == true) navigator('/');
  }, []);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark flex flex-col h-screen">
      <div className="top-0">
        <AuthHeader sidebarOpen={false} setSidebarOpen={() => {}}></AuthHeader>
      </div>
      <main className="flex-1 overflow-y-auto items-center">
        <div className="mx-auto max-w-screen-2xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default AuthLayout;

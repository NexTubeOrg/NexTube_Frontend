import { Outlet } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';

const AuthLayout = () => {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <AuthHeader sidebarOpen={false} setSidebarOpen={() => {}}></AuthHeader>
      <main>
        <div className="mx-auto max-w-screen-2xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default AuthLayout;

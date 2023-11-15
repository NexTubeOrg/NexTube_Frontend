import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn/SignIn.tsx';
import SignUp from './pages/Authentication/SignUp/SignUp.tsx';
import Loader from './common/Loader';
import routes from './routes';
import DefaultLayout from './layout/DefaultLayout.tsx';
import HomePage from './pages/Home/HomePage.tsx';
import AuthLayout from './layout/AuthLayout.tsx';
import SignOut from './pages/Authentication/SignOut.tsx';
import { ToastContainer } from 'react-toastify';
import VideoLayout from './layout/VideoLayout.tsx';
import VideoPlaybackPage from './pages/Video/VideoPlayback/VideoPlaybackPage.tsx';

const AdminLayout = lazy(() => import('./layout/AdminLayout.tsx'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path={'/auth'} element={<AuthLayout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signout" element={<SignOut />} />
        </Route>

        <Route path={'/video'} element={<VideoLayout />}>
          <Route path={'watch'}>
            <Route path={':id'} element={<VideoPlaybackPage />} />
          </Route>
        </Route>

        <Route path={'/admin'} element={<AdminLayout />}>
          <Route index element={<ECommerce />} />
          {routes.map(({ path, component: Component }, id) => (
            <Route
              key={id}
              path={path}
              element={
                <Suspense fallback={<Loader />}>
                  <Component />
                </Suspense>
              }
            />
          ))}
        </Route>
        
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

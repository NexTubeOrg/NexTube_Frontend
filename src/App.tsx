import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignInPage/SignInPage.tsx';
import SignUp from './pages/Authentication/SignUp/SignUpPage.tsx';
import Loader from './common/Loader';
import routes from './routes';
import DefaultLayout from './layout/DefaultLayout.tsx';
import HomePage from './pages/Home/HomePage.tsx';
import AuthLayout from './layout/AuthLayout.tsx';
import SignOut from './pages/Authentication/SignOut.tsx';
import { ToastContainer } from 'react-toastify';
import { VideosListContainer } from './components/Videos/VideosListContainer.tsx';
import { WatchVideo } from './components/Videos/WatchVideo.tsx';
import UpdateUser from './pages/UpdateUser/UpdateUser.tsx';
import SubscribeButton from './pages/Subscription/UpdateUser/Subscription.tsx';
 

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
          <Route path="profile" element={<VideosListContainer />} />
          <Route path="search" element={<WatchVideo />} />
        </Route>
        <Route path="update-user" element={<UpdateUser />} />
       {/* <Route path="subscription" element={<SubscribeButton isLoading={false} onClick={()=>{}} text={''} backgroundClassname={''} type={undefined} subscribeId={0} />} /> */}

         <Route path={'/auth'} element={<DefaultLayout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signout" element={<SignOut />} />
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
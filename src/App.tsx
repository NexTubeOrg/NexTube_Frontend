import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Admin from './pages/Dashboard/Admin/Admin.tsx';
import SignIn from './pages/Authentication/SignInPage/SignInPage.tsx';
import SignUp from './pages/Authentication/SignUp/SignUpPage.tsx';
import Loader from './common/Loader';
import DefaultLayout from './layout/DefaultLayout.tsx';
import HomePage from './pages/Home/HomePage.tsx';
import SignOut from './pages/Authentication/SignOut.tsx';
import { ToastContainer } from 'react-toastify';
import VideoWatchPage from './pages/Video/VideoWatchPage.tsx';
import { ViewChannel } from './components/Channel/ViewChannel/ViewChannel.tsx';
import routes, { channelRoutes, profileRoutes } from './routes/index.ts';
import { ChannelHome } from './components/Channel/Routes/Home/index.tsx';
import { Profile } from './components/Profile/Profile.tsx';
import { ProfileBranding } from './components/Profile/Routes/Branding/index.tsx';
import Moderator from './pages/Dashboard/Moderator/Moderator.tsx';
import ReportForm from './components/ReportForm.tsx';
import RecoverPassword from './components/Auth/RecoverPassword/RecoverPassword.tsx';
import { SearchResults } from './components/Search/SearchResults.tsx';

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
          <Route path="channel/:id" element={<ViewChannel />}>
            <Route index element={<ChannelHome></ChannelHome>}></Route>
            {channelRoutes.map(({ path, component: Component }, id) => (
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
          <Route path="profile" element={<Profile />}>
            <Route index element={<ProfileBranding></ProfileBranding>}></Route>
            {profileRoutes.map(({ path, component: Component, routes }, id) => (
              <Route
                key={id}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              >
                {routes &&
                  routes.map(({ path, component: Component }, id) => (
                    <Route
                      key={id}
                      path={path}
                      element={
                        <Suspense fallback={<Loader />}>
                          <Component />
                        </Suspense>
                      }
                    ></Route>
                  ))}
              </Route>
            ))}
          </Route>
        </Route>
  
      
         <Route path={'/auth'} element={<DefaultLayout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signout" element={<SignOut />} />
          <Route path="recover" element={<RecoverPassword />} />
        </Route>

        <Route path={'/video'} element={<DefaultLayout />}>
          <Route path={'watch'}>
            <Route path={':id'} element={<VideoWatchPage />} />
          </Route>
          <Route path={'search'} element={<SearchResults />}></Route>
        </Route>

        <Route path={'/admin'} element={<AdminLayout />}>
          <Route index element={<Admin />} />
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

        <Route path={'/moderator'} element={<AdminLayout />}>
          <Route index element={<Moderator />} />
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
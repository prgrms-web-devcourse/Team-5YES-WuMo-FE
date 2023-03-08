import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ScrollToTop from './components/base/ScrollToTop';
import BottomNavigation from './components/navigation/BottomNavigation';
import PartyInformation from './components/party/partyInformation/PartyInformation';
import {
  BestRouteDetailPage,
  BestRouteListPage,
  LandingPage,
  LikeRouteListPage,
  MainPage,
  NotFoundPage,
  PartyAlbumPage,
  PartyCommentPage,
  PartyCreatePage,
  PartyListPage,
  PartyPlanPage,
  PartySchedulePage,
  PlaceCreatePage,
  PlacePage,
  ProfileEditPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
} from './pages';
import { PrivateRoute } from './utils/constants/redirect';
import ROUTES from './utils/constants/routes';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<BottomNavigation />}>
          <Route element={<PrivateRoute redirectPath={ROUTES.LANDING} />}>
            <Route path={ROUTES.MAIN} element={<MainPage />} />
          </Route>
          <Route element={<PrivateRoute redirectPath={ROUTES.NOTFOUND} />}>
            <Route path={ROUTES.LIKE} element={<LikeRouteListPage />} />
          </Route>
          <Route element={<PrivateRoute redirectPath={ROUTES.NOTFOUND} />}>
            <Route path={ROUTES.PARTY_CREATE} element={<PartyCreatePage />} />
          </Route>
          <Route element={<PrivateRoute redirectPath={ROUTES.NOTFOUND} />}>
            <Route path={ROUTES.PLACE_NEW} element={<PlaceCreatePage />} />
          </Route>
          <Route element={<PrivateRoute redirectPath={ROUTES.NOTFOUND} />}>
            <Route path={ROUTES.BEST_ROUTE_LIST} element={<BestRouteListPage />} />
          </Route>
          <Route element={<PrivateRoute redirectPath={ROUTES.NOTFOUND} />}>
            <Route path={ROUTES.BEST_ROUTE_DETAIL} element={<BestRouteDetailPage />} />
          </Route>
          <Route element={<PrivateRoute redirectPath={ROUTES.NOTFOUND} />}>
            <Route path={ROUTES.PARTY_LIST} element={<PartyListPage />} />
          </Route>
          <Route element={<PrivateRoute redirectPath={ROUTES.NOTFOUND} />}>
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          </Route>
          <Route element={<PrivateRoute redirectPath={ROUTES.NOTFOUND} />}>
            <Route path={ROUTES.PROFILE_EDIT} element={<ProfileEditPage />} />
          </Route>

          <Route element={<PartyInformation />}>
            <Route element={<PrivateRoute redirectPath={ROUTES.NOTFOUND} />}>
              <Route path={ROUTES.SCHEDULE} element={<PartySchedulePage />} />
            </Route>
            <Route element={<PrivateRoute redirectPath={ROUTES.NOTFOUND} />}>
              <Route path={ROUTES.PLAN} element={<PartyPlanPage />} />
            </Route>
            <Route element={<PrivateRoute redirectPath={ROUTES.NOTFOUND} />}>
              <Route path={ROUTES.ALBUM} element={<PartyAlbumPage />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute redirectPath={ROUTES.NOTFOUND} />}>
            <Route path={ROUTES.SCHEDULE_COMMENT} element={<PartyCommentPage />} />
          </Route>
          <Route element={<PrivateRoute redirectPath={ROUTES.NOTFOUND} />}>
            <Route path={ROUTES.PLACE_DETAIL} element={<PlacePage />} />
          </Route>
        </Route>

        {/* BottomNav 없는 페이지 */}
        <Route
          element={<PrivateRoute authentication={false} redirectPath={ROUTES.MAIN} />}>
          <Route path={ROUTES.LANDING} element={<LandingPage />} />
        </Route>
        <Route
          element={<PrivateRoute authentication={false} redirectPath={ROUTES.MAIN} />}>
          <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
        </Route>
        <Route
          element={<PrivateRoute authentication={false} redirectPath={ROUTES.MAIN} />}>
          <Route path={ROUTES.SIGNIN} element={<SignInPage />} />
        </Route>
        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

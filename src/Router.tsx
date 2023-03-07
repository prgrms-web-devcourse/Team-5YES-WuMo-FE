import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import ScrollToTop from './components/base/ScrollToTop';
import BottomNavigation from './components/navigation/BottomNavigation';
import PartyInformation from './components/party/partyInformation/PartyInformation';
import useLocalStorage from './hooks/useLocalStorage';
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
import ROUTES from './utils/constants/routes';

const Router = () => {
  const [token, _] = useLocalStorage('accessToken', '');

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<BottomNavigation />}>
          <Route path={ROUTES.MAIN} element={<MainPage />} />
          <Route path={ROUTES.LIKE} element={<LikeRouteListPage />} />
          <Route path={ROUTES.PARTY_CREATE} element={<PartyCreatePage />} />
          <Route path={ROUTES.PLACE_NEW} element={<PlaceCreatePage />} />
          <Route path={ROUTES.BEST_ROUTE_LIST} element={<BestRouteListPage />} />
          <Route path={ROUTES.BEST_ROUTE_DETAIL} element={<BestRouteDetailPage />} />
          <Route path={ROUTES.PARTY_LIST} element={<PartyListPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.PROFILE_EDIT} element={<ProfileEditPage />} />
          <Route element={<PartyInformation />}>
            <Route path={ROUTES.SCHEDULE} element={<PartySchedulePage />} />
            <Route path={ROUTES.PLAN} element={<PartyPlanPage />} />
            <Route path={ROUTES.ALBUM} element={<PartyAlbumPage />} />
          </Route>
          <Route path={ROUTES.SCHEDULE_COMMENT} element={<PartyCommentPage />} />
          <Route path={ROUTES.PLACE_DETAIL} element={<PlacePage />} />
        </Route>
        <Route
          path={ROUTES.LANDING}
          element={token ? <Navigate to={ROUTES.MAIN} /> : <LandingPage />}
        />
        <Route
          path={ROUTES.SIGNUP}
          element={token ? <Navigate to={ROUTES.MAIN} /> : <SignUpPage />}
        />
        <Route
          path={ROUTES.SIGNIN}
          element={token ? <Navigate to={ROUTES.MAIN} /> : <SignInPage />}
        />
        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

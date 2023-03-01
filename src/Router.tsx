import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ScrollToTop from './components/base/ScrollToTop';
import BottomNavigation from './components/navigation/BottomNavigation';
import PartyInformation from './components/party/partyInformation/PartyInformation';
import {
  BestRouteDetailPage,
  BestRouteListPage,
  LikeRouteListPage,
  MainPage,
  PartyAlbumPage,
  PartyCommentPage,
  PartyCreatePage,
  PartyListPage,
  // PartyNoticePage,
  PartyPlanPage,
  PartySchedulePage,
  PlacePage,
  ProfilePage,
  SignInPage,
  SignUpPage,
} from './pages';
import ROUTES from './utils/constants/routes';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<BottomNavigation />}>
          <Route path={ROUTES.MAIN} element={<MainPage />} />
          <Route path={ROUTES.LIKE} element={<LikeRouteListPage />} />
          <Route path={ROUTES.PARTY_CREATE} element={<PartyCreatePage />} />
          <Route path={ROUTES.BEST_ROUTE_LIST} element={<BestRouteListPage />} />
          <Route path={ROUTES.BEST_ROUTE_DETAIL} element={<BestRouteDetailPage />} />
          <Route path={ROUTES.PARTY_LIST} element={<PartyListPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route element={<PartyInformation />}>
            {/* <Route path={ROUTES.NOTICE} element={<PartyNoticePage />} /> */}
            <Route path={ROUTES.SCHEDULE} element={<PartySchedulePage />} />
            <Route path={ROUTES.PLAN} element={<PartyPlanPage />} />
            <Route path={ROUTES.ALBUM} element={<PartyAlbumPage />} />
          </Route>
          <Route path={ROUTES.SCHEDULE_COMMENT} element={<PartyCommentPage />} />
          <Route path={ROUTES.PLACE_DETAIL} element={<PlacePage />} />
        </Route>
        <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
        <Route path={ROUTES.SIGNIN} element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

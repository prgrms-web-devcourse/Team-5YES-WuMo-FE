import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BottomNavigation from './components/navigation/BottomNavigation';
import PartyInformation from './components/party/partyInformation/PartyInformation';
import {
  BestRouteDetailPage,
  BestRouteListPage,
  LikeRouteListPage,
  MainPage,
  PartyAlbumPage,
  PartyCommentPage,
  PartyNoticePage,
  PartyPlanPage,
  PartySchedulePage,
  SignInPage,
  SignUpPage,
} from './pages';
import PlaceCreatePage from './pages/PlaceCreatePage';
import ROUTES from './utils/constants/routes';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BottomNavigation />}>
          <Route path={ROUTES.MAIN} element={<MainPage />} />
          <Route path={ROUTES.LIKE} element={<LikeRouteListPage />} />
          <Route path={ROUTES.BEST_ROUTE_LIST} element={<BestRouteListPage />} />
          <Route path={ROUTES.BEST_ROUTE_DETAIL} element={<BestRouteDetailPage />} />
          <Route element={<PartyInformation />}>
            <Route path={ROUTES.NOTICE} element={<PartyNoticePage />} />
            <Route path={ROUTES.SCHEDULE} element={<PartySchedulePage />} />
            <Route path={ROUTES.PLAN} element={<PartyPlanPage />} />
            <Route path={ROUTES.ALBUM} element={<PartyAlbumPage />} />
          </Route>
          <Route path={ROUTES.PLACE_NEW} element={<PlaceCreatePage />} />
          <Route path={ROUTES.SCHEDULE_COMMENT} element={<PartyCommentPage />} />
        </Route>
        <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
        <Route path={ROUTES.SIGNIN} element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

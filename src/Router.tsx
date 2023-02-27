import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BottomNavigation from './components/navigation/BottomNavigation';
import PartyInformation from './components/party/partyInformation/PartyInformation';
import {
  BestRouteDetailPage,
  BestRouteListPage,
  LikeRouteListPage,
  MainPage,
  PartyAlbumPage,
  PartyCreatePage,
  PartyNoticePage,
  PartyPlanPage,
  PartySchedulePage,
  PlaceCreatePage,
  SignInPage,
  SignUpPage,
} from './pages';
import ROUTES from './utils/constants/routes';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BottomNavigation />}>
          <Route path={ROUTES.MAIN} element={<MainPage />} />
          <Route path={ROUTES.LIKE} element={<LikeRouteListPage />} />
          <Route path={ROUTES.PARTY_CREATE} element={<PartyCreatePage />} />
          <Route path={ROUTES.BEST_ROUTE_LIST} element={<BestRouteListPage />} />
          <Route path={ROUTES.BEST_ROUTE_DETAIL} element={<BestRouteDetailPage />} />
          <Route element={<PartyInformation />}>
            <Route path={ROUTES.NOTICE} element={<PartyNoticePage />} />
            <Route path={ROUTES.SCHEDULE} element={<PartySchedulePage />} />
            <Route path={ROUTES.PLAN} element={<PartyPlanPage />} />
            <Route path={ROUTES.ALBUM} element={<PartyAlbumPage />} />
          </Route>
          <Route path={ROUTES.PLACE_NEW} element={<PlaceCreatePage />} />
        </Route>
        <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
        <Route path={ROUTES.SIGNIN} element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

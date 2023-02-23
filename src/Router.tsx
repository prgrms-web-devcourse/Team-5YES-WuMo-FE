import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BottomNavigation from './components/bottomNavigation/BottomNavigation';
import PartyInformation from './components/party/partyInformation/PartyInformation';
import {
  MainPage,
  PartyAlbumPage,
  PartyNoticePage,
  PartyPlanPage,
  PartySchedulePage,
  SignUpPage,
} from './pages';
import LikeRouteListPage from './pages/LikeRouteListPage';
import ROUTES from './utils/constants/routes';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
        <Route path={ROUTES.LIKE} element={<LikeRouteListPage />} />
        <Route element={<PartyInformation />}>
          <Route path={ROUTES.NOTICE} element={<PartyNoticePage />} />
          <Route path={ROUTES.SCHEDULE} element={<PartySchedulePage />} />
          <Route path={ROUTES.PLAN} element={<PartyPlanPage />} />
          <Route path={ROUTES.ALBUM} element={<PartyAlbumPage />} />
        </Route>
      </Routes>
      <BottomNavigation />
    </BrowserRouter>
  );
};

export default Router;

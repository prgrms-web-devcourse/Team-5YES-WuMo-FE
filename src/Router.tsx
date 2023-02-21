import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PartyInformation from './components/Party/PartyInformation/PartyInformation';

import {
  MainPage,
  PartyAlbumPage,
  PartyNoticePage,
  PartyPlanPage,
  PartySchedulePage,
  SignUpPage,
} from './pages';
import ROUTES from './utils/routes';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
        <Route element={<PartyInformation />}>
          <Route path={ROUTES.NOTICE} element={<PartyNoticePage />} />
          <Route path={ROUTES.SCHEDULE} element={<PartySchedulePage />} />
          <Route path={ROUTES.PLAN} element={<PartyPlanPage />} />
          <Route path={ROUTES.ALBUM} element={<PartyAlbumPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

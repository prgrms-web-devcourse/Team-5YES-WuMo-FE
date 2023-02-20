import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainPage, SignUpPage } from './pages';
import ROUTES from './utils/routes';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

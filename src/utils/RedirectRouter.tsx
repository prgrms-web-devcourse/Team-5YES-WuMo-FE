import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { RedirectRouterProps } from '@/types/router';

import { AT_KEY } from './constants/auth';

const RedirectRouter = ({
  authentication = true,
  redirectPath,
}: RedirectRouterProps): ReactElement | null => {
  const token = localStorage.getItem(AT_KEY);

  if (authentication) {
    return token ? <Outlet /> : <Navigate to={redirectPath} />;
  } else {
    return token ? <Navigate to={redirectPath} /> : <Outlet />;
  }
};

export { RedirectRouter };

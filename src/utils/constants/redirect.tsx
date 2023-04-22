import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { PrivateRouteProps } from '@/types/router';

import { AT_KEY } from './auth';

const PrivateRoute = ({
  authentication = true,
  redirectPath,
}: PrivateRouteProps): ReactElement | null => {
  const token = localStorage.getItem(AT_KEY);

  if (authentication) {
    return token ? <Outlet /> : <Navigate to={redirectPath} />;
  } else {
    return token ? <Navigate to={redirectPath} /> : <Outlet />;
  }
};

export { PrivateRoute };

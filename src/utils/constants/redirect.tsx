import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { PrivateRouteProps } from '@/types/router';

const PrivateRoute = ({
  authentication = true,
  redirectPath,
}: PrivateRouteProps): ReactElement | null => {
  const tokens = localStorage.getItem('tokens');

  if (authentication) {
    return tokens ? <Outlet /> : <Navigate to={redirectPath} />;
  } else {
    return tokens ? <Navigate to={redirectPath} /> : <Outlet />;
  }
};

export { PrivateRoute };

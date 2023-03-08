import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import useLocalStorage from '@/hooks/useLocalStorage';
import { PrivateRouteProps } from '@/types/router';

const PrivateRoute = ({
  authentication = true,
  redirectPath,
}: PrivateRouteProps): ReactElement | null => {
  const [token, _] = useLocalStorage('accessToken', '');

  if (authentication) {
    return token ? <Outlet /> : <Navigate to={redirectPath} />;
  } else {
    return token ? <Navigate to={redirectPath} /> : <Outlet />;
  }
};

export { PrivateRoute };

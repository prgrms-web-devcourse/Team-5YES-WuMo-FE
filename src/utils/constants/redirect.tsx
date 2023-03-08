import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import useLocalStorage from '@/hooks/useLocalStorage';
import { PrivateRouteProps } from '@/types/router';

const PrivateRoute = ({
  authentication = true,
  redirectPath,
}: PrivateRouteProps): ReactElement | null => {
  const [tokens, _] = useLocalStorage('tokens', {});

  if (authentication) {
    return tokens.accessToken ? <Outlet /> : <Navigate to={redirectPath} />;
  } else {
    return tokens.accessToken ? <Navigate to={redirectPath} /> : <Outlet />;
  }
};

export { PrivateRoute };

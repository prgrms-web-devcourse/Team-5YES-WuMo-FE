import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { RedirectRouterProps } from '@/types/router';

const RedirectRouter = ({
  authentication = true,
  redirectPath,
}: RedirectRouterProps): ReactElement | null => {
  const tokens = localStorage.getItem('tokens');

  if (authentication) {
    return tokens ? <Outlet /> : <Navigate to={redirectPath} />;
  } else {
    return tokens ? <Navigate to={redirectPath} /> : <Outlet />;
  }
};

export { RedirectRouter };

import React, { FC } from 'react';
import { RouteProps, Route } from 'react-router-dom';

import { useAuth0 } from '../contexts/auth0Context';

type PrivateRouteProps = {
  path: RouteProps['path'];
  component: React.ElementType;
};

export const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...routeProps
}): JSX.Element => {
  const { isAuthenticated, user, login } = useAuth0();

  if (!isAuthenticated && !user) {
    login();
  }

  return (
    <Route {...routeProps}>
      <Component />
    </Route>
  );
};

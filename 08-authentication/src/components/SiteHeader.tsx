import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAuth0 } from '../contexts/auth0Context';

export const SiteHeader: FC = () => {
  const { isAuthenticated, login, logout, user } = useAuth0();

  return (
    <div className="site-header">
      {/* stuff on the left */}
      <div>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      {/* stuff on the right */}
      <div>
        <span>{user?.name}</span>&nbsp;
        <button type="button" onClick={isAuthenticated ? logout : login}>
          {isAuthenticated ? 'Logout' : 'Login'}
        </button>
      </div>
    </div>
  );
};

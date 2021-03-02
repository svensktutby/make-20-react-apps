import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const SiteHeader: FC = () => {
  return (
    <div className="site-header">
      {/* stuff on the left */}
      <div>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>

      {/* stuff on the right */}
      <div>
        <button type="button">Login</button>
        <button type="button">Logout</button>
      </div>
    </div>
  );
};

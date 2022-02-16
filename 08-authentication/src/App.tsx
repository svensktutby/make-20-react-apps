import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useAuth0 } from './contexts/auth0Context';
import { SiteHeader } from './components/SiteHeader';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { PrivateRoute } from './components/PrivateRoute';

import './App.css';

export const App: FC = () => {
  const { getToken } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();

        const response = await fetch('https://example.com/api', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        // we have data!
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getToken]);

  return (
    <Router>
      <div className="app">
        {/* site header */}
        <SiteHeader />

        {/* routes */}
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

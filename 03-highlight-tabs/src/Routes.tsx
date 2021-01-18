import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Features } from './pages/Features';

export const Routes: FC = () => {
  return (
    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/features">
        <Features />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  );
};

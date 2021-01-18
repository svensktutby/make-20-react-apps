import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Tab } from './Tab';

export const Header: FC = () => {
  return (
    <div className="tabs">
      <Tab>
        <NavLink to="/" activeClassName="is-active" exact>
          Home
        </NavLink>
      </Tab>
      <Tab>
        <NavLink to="/about" activeClassName="is-active">
          About
        </NavLink>
      </Tab>
      <Tab>
        <NavLink to="/features" activeClassName="is-active">
          Features
        </NavLink>
      </Tab>
    </div>
  );
};

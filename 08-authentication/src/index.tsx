import React from 'react';
import ReactDOM from 'react-dom';

import { Auth0ContextProvider } from './contexts/auth0Context';
import { App } from './App';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Auth0ContextProvider>
      <App />
    </Auth0ContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

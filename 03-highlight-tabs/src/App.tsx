import React, { ChangeEvent, FC, useState } from 'react';

import './App.css';

export const App: FC = () => {
  return (
    <div className="app">
      <div className="browser">
        <div className="tabs">
          <div className="tab">
            <a>Home</a>
          </div>
          <div className="tab">
            <a>About</a>
          </div>
          <div className="tab">
            <a>Features</a>
          </div>
        </div>

        <div className="viewport">Pages Go Here</div>
      </div>
    </div>
  );
};

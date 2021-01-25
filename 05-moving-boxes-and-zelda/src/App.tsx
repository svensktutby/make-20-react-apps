import React, { FC } from 'react';
import './App.css';

export const App: FC = () => {
  return (
    <div className="app">
      <canvas />

      <div className="arrows">
        <button type="button">Up</button>
        <button type="button">Left</button>
        <button type="button">Down</button>
        <button type="button">Right</button>
      </div>

      <div className="images">
        <img src="https://i.imgur.com/JYUB0m3.png" alt="Down" />
        <img src="https://i.imgur.com/GEXD7bk.gif" alt="Right" />
        <img src="https://i.imgur.com/XSA2Oom.gif" alt="Up" />
        <img src="https://i.imgur.com/4LGAZ8t.gif" alt="Left" />
      </div>
    </div>
  );
};

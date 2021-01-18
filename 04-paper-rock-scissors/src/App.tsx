import React, { FC } from 'react';

import './App.css';
import { Rock } from './icons/Rock';
import { Scissors } from './icons/Scissors';
import { Paper } from './icons/Paper';

export const App: FC = () => {
  return (
    <div className="app">
      {/* information goes here */}
      <div className="info">
        <h2>Rock. Paper. Scissors</h2>

        {/* wins vs losses stats */}
        <div className="wins-losses">
          <div className="wins">
            <span className="number">0</span>
            <span className="text">Wins</span>
          </div>

          <div className="losses">
            <span className="number">0</span>
            <span className="text">Losses</span>
          </div>
        </div>
      </div>

      {/* the popup to show win/loss/draw */}
      {/* <div className="game-state"></div> */}

      <div className="choices">
        {/* choices captions */}
        <div>You</div>
        <div />
        <div>Computer</div>

        {/* buttons for my choice */}
        <div>
          <button type="button" className="rock">
            <Rock />
          </button>
          <button type="button" className="paper">
            <Paper />
          </button>
          <button type="button" className="scissors">
            <Scissors />
          </button>
        </div>

        <div className="vs">vs</div>

        {/* show the computer's choice */}
        <div>
          <button type="button" className="computer-choice">
            ?
          </button>
        </div>
      </div>
    </div>
  );
};

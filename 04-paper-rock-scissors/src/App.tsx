import React, { FC, ReactElement, useEffect, useState } from 'react';

import './App.css';
import { Rock } from './icons/Rock';
import { Scissors } from './icons/Scissors';
import { Paper } from './icons/Paper';

type GameStateType = 'win' | 'lose' | 'draw';
type NameType = 'rock' | 'paper' | 'scissors';
type ChoiceType = {
  id: number;
  name: NameType;
  component: FC;
  losesTo: number;
};

const choices: Array<ChoiceType> = [
  { id: 1, name: 'rock', component: Rock, losesTo: 2 },
  { id: 2, name: 'paper', component: Paper, losesTo: 3 },
  { id: 3, name: 'scissors', component: Scissors, losesTo: 1 },
];

export const App: FC = () => {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [userChoice, setUserChoice] = useState<null | ChoiceType>(null);
  const [computerChoice, setComputerChoice] = useState<null | ChoiceType>(null);
  const [gameState, setGameState] = useState<null | GameStateType>(null);
  const restartGame = (): void => {
    setGameState(null);
    setUserChoice(null);

    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  };

  useEffect(() => {
    restartGame();
  }, []);

  const handleUserChoice = (choiceId: number) => {
    const chosenChoice = choices.find((c) => c.id === choiceId);
    if (chosenChoice) {
      setUserChoice(chosenChoice);
    }

    // determine the winner
    if (chosenChoice && computerChoice) {
      if (chosenChoice.losesTo === computerChoice.id) {
        setLosses((prevState) => prevState + 1);
        setGameState('lose');
      } else if (computerChoice.losesTo === chosenChoice.id) {
        setWins((prevState) => prevState + 1);
        setGameState('win');
      } else if (computerChoice.id === chosenChoice.id) {
        setGameState('draw');
      }
    }
  };

  const renderComponent = (choice: ChoiceType): ReactElement => {
    const Component = choice.component;
    return <Component />;
  };

  return (
    <div className="app">
      {/* information goes here */}
      <div className="info">
        <h2>Rock. Paper. Scissors</h2>

        {/* wins vs losses stats */}
        <div className="wins-losses">
          <div className="wins">
            <span className="number">{wins}</span>
            <span className="text">{wins === 1 ? 'Win' : 'Wins'}</span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
            <span className="text">{losses === 1 ? 'Lose' : 'Losses'}</span>
          </div>
        </div>
      </div>

      {/* the popup to show win/lose/draw */}
      {gameState && (
        <div className={`game-state ${gameState}`}>
          <div>
            <div className="game-state-content">
              <p>{userChoice && renderComponent(userChoice)}</p>

              {gameState === 'win' && <p>Congrats! You won!</p>}
              {gameState === 'lose' && <p>Sorry! You lost!</p>}
              {gameState === 'draw' && <p>You drew!</p>}

              <p>{computerChoice && renderComponent(computerChoice)}</p>
            </div>

            <button type="button" onClick={() => restartGame()}>
              Play Again
            </button>
          </div>
        </div>
      )}

      <div className="choices">
        {/* choices captions */}
        <div>You</div>
        <div />
        <div>Computer</div>

        {/* buttons for my choice */}
        <div>
          <button
            type="button"
            className="rock"
            onClick={() => handleUserChoice(1)}
          >
            <Rock />
          </button>
          <button
            type="button"
            className="paper"
            onClick={() => handleUserChoice(2)}
          >
            <Paper />
          </button>
          <button
            type="button"
            className="scissors"
            onClick={() => handleUserChoice(3)}
          >
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

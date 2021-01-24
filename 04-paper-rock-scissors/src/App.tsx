import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Rock } from './icons/Rock';
import { Scissors } from './icons/Scissors';
import { Paper } from './icons/Paper';
import { Choices } from './components/Choices';
import { Info } from './components/Info';
import { GameState, ChoiceType, GameStateType } from './components/GameState';

const choices: Array<ChoiceType> = [
  { id: 1, name: 'rock', component: Rock, losesTo: 2 },
  { id: 2, name: 'paper', component: Paper, losesTo: 3 },
  { id: 3, name: 'scissors', component: Scissors, losesTo: 1 },
];

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 50px;
  padding-right: 50px;
  padding-left: 50px;

  font-family: sans-serif;
  color: #cadbf5;

  background: #478aef;
`;

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

  return (
    <AppDiv>
      <Info wins={wins} losses={losses} />
      {/* the popup to show win/lose/draw */}
      {gameState && (
        <GameState
          gameState={gameState}
          userChoice={userChoice}
          computerChoice={computerChoice}
          restartGame={restartGame}
        />
      )}

      <Choices handleUserChoice={handleUserChoice} />
    </AppDiv>
  );
};

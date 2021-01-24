import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactElement,
} from 'react';
import styled from 'styled-components';

export type GameStateType = 'win' | 'lose' | 'draw';
type NameType = 'rock' | 'paper' | 'scissors';
export type ChoiceType = {
  id: number;
  name: NameType;
  component: FC;
  losesTo: number;
};

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type ButtonPropsType = DefaultButtonPropsType;
type GameStatePropsType = {
  gameState: null | GameStateType;
  userChoice: null | ChoiceType;
  computerChoice: null | ChoiceType;
  restartGame: () => void;
};

const GameStateDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  font-size: 24px;
  line-height: 1.3;
  font-family: 'Varela Round', sans-serif;

  background: rgba(0, 0, 0, 0.5);

  &.win {
    & > div {
      color: rgb(226, 243, 206);

      background: rgb(141, 195, 81);
    }

    & svg path {
      fill: rgb(226, 243, 206);
    }
  }

  &.draw {
    & > div {
      color: rgb(88, 88, 88);

      background: rgb(0, 0, 0);
    }

    & svg path {
      fill: rgb(88, 88, 88);
    }
  }

  &.lose {
    & > div {
      color: rgb(240, 169, 184);

      background: rgb(218, 81, 111);
    }

    & svg path {
      fill: rgb(240, 169, 184);
    }
  }

  & > div {
    z-index: 1;

    width: 60%;
    padding: 0 40px;

    font-size: 60px;
    text-align: center;
    color: #fff;

    border-radius: 10px;
  }
`;

const GameStateContentDiv = styled.div`
  display: flex;
  justify-content: center;

  & p {
    display: flex;
    align-items: center;
    margin: 40px 15px 30px 0;
  }

  & svg {
    width: 100px;
  }
`;

const Button = styled.button<ButtonPropsType>`
  display: block;
  flex-shrink: 1;
  width: 100%;
  margin-bottom: -5%;
  padding: 25px;

  font-size: 30px;
  color: #fdedfd;

  background: #fa65ff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

export const GameState: FC<GameStatePropsType> = ({
  gameState,
  userChoice,
  computerChoice,
  restartGame,
}) => {
  const renderComponent = (choice: ChoiceType): ReactElement => {
    const Component = choice.component;
    return <Component />;
  };

  return (
    <GameStateDiv className={`${gameState}`}>
      <div>
        <GameStateContentDiv>
          <p>{userChoice && renderComponent(userChoice)}</p>

          {gameState === 'win' && <p>Congrats! You won!</p>}
          {gameState === 'lose' && <p>Sorry! You lost!</p>}
          {gameState === 'draw' && <p>You drew!</p>}

          <p>{computerChoice && renderComponent(computerChoice)}</p>
        </GameStateContentDiv>

        <Button onClick={() => restartGame()}>Play Again</Button>
      </div>
    </GameStateDiv>
  );
};

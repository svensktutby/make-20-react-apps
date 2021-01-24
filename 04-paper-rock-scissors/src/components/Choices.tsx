import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import styled, { css } from 'styled-components';

import { Rock } from '../icons/Rock';
import { Paper } from '../icons/Paper';
import { Scissors } from '../icons/Scissors';

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type ButtonPropsType = DefaultButtonPropsType & {
  rock?: boolean;
  paper?: boolean;
  scissors?: boolean;
  computerChoice?: boolean;
};
type ChoicesPropsType = {
  handleUserChoice: (choiceId: number) => void;
};

const ChoicesDiv = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;

  font-size: 18px;
  font-family: 'Varela Round', sans-serif;
  text-align: center;
  color: #5f99f0;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const VsDiv = styled.div`
  width: 100px;

  font-size: 100px;

  transform: rotate(-0.1turn);
  opacity: 0.25;

  pointer-events: none;
`;

const Button = styled.button<ButtonPropsType>`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  padding: 20px;

  font-size: 50px;

  background: #fff;

  border: none;
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  transition: 0.1s ease all;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: scale(1.07);
  }

  ${(props) => {
    return (
      (props.rock &&
        css`
          background: #f7941a;

          & path {
            fill: #815116;
          }
        `) ||
      (props.paper &&
        css`
          background: #8dc351;

          & path {
            fill: #3f5e1b;
          }
        `) ||
      (props.scissors &&
        css`
          background: #7c79ea;

          & path {
            fill: #2f2c8f;
          }
        `) ||
      (props.computerChoice &&
        css`
          color: #bbb;
          background: #333;

          & path {
            fill: #bbb;
          }
        `)
    );
  }}
`;

export const Choices: FC<ChoicesPropsType> = ({ handleUserChoice }) => {
  return (
    <ChoicesDiv>
      {/* choices captions */}
      <div>You</div>
      <div />
      <div>Computer</div>

      {/* buttons for my choice */}
      <div>
        <Button rock onClick={() => handleUserChoice(1)}>
          <Rock />
        </Button>
        <Button paper onClick={() => handleUserChoice(2)}>
          <Paper />
        </Button>
        <Button scissors onClick={() => handleUserChoice(3)}>
          <Scissors />
        </Button>
      </div>

      <VsDiv>vs</VsDiv>

      {/* show the computer's choice */}
      <div>
        <Button computerChoice>?</Button>
      </div>
    </ChoicesDiv>
  );
};

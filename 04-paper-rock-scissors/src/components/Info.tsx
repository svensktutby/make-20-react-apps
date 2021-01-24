import React, { FC } from 'react';
import styled from 'styled-components';

type InfoPropsType = {
  wins: number;
  losses: number;
};

const InfoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 50px;

  & h2 {
    margin-top: 0;
    margin-bottom: 0;

    font-size: 18px;
    text-align: center;
  }
`;

const WinsLossesDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  font-size: 16px;
  line-height: 1;
  font-family: 'Varela Round', sans-serif;
  text-align: center;
`;

const WinsDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;

  & .number {
    color: #5dc674;
  }
`;

const LossesDiv = styled.div`
  display: flex;
  align-items: center;

  & .number {
    color: #da516f;
  }
`;

const NumberSpan = styled.span`
  margin-right: 5px;

  font-size: 52px;
`;

const TextSpan = styled.span``;

export const Info: FC<InfoPropsType> = ({ wins, losses }) => {
  return (
    <InfoDiv>
      {/* information goes here */}
      <h2>Rock. Paper. Scissors</h2>

      {/* wins vs losses stats */}
      <WinsLossesDiv>
        <WinsDiv>
          <NumberSpan className="number">{wins}</NumberSpan>
          <TextSpan>{wins === 1 ? 'Win' : 'Wins'}</TextSpan>
        </WinsDiv>

        <LossesDiv>
          <NumberSpan className="number">{losses}</NumberSpan>
          <TextSpan>{losses === 1 ? 'Lose' : 'Losses'}</TextSpan>
        </LossesDiv>
      </WinsLossesDiv>
    </InfoDiv>
  );
};

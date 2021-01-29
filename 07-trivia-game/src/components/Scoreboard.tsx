import React, { FC, useEffect, useState } from 'react';

type ScoreboardPropsType = {
  isCorrect: null | boolean;
};

export const Scoreboard: FC<ScoreboardPropsType> = ({ isCorrect }) => {
  const [wrong, setWrong] = useState(0);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    if (isCorrect) {
      setCorrect((score) => score + 1);
    }
    if (!isCorrect && isCorrect !== null) {
      setWrong((score) => score + 1);
    }
  }, [isCorrect]);

  return (
    <div className="scoreboard">
      <div className="wrong">
        <strong>{wrong}</strong>
        <span>wrong</span>
      </div>
      <div className="correct">
        <strong>{correct}</strong>
        <span>correct</span>
      </div>
    </div>
  );
};

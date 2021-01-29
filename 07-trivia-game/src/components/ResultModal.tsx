import React, { FC } from 'react';
import DOMPurify from 'dompurify';

import { QuestionType } from '../api/triviaApi';

type ResultModalPropsType = {
  isCorrect: null | boolean;
  question: null | QuestionType;
  handleNextQuestion: () => void;
};

export const ResultModal: FC<ResultModalPropsType> = ({
  isCorrect,
  question,
  handleNextQuestion,
}) => {
  const correctAnswer = DOMPurify.sanitize(question!.correct_answer);

  return (
    <div className={`result-modal ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
      <div className="overlay" />
      <div className="result-modal-content">
        {isCorrect && (
          <h3>
            <span role="img" aria-label="closed fist">
              👊
            </span>
            <span role="img" aria-label="closed fist">
              👊
            </span>
            <span role="img" aria-label="closed fist">
              👊
            </span>
            <br />
            YOU WON!
          </h3>
        )}

        {!isCorrect && (
          <h3>
            <span role="img" aria-label="worried face">
              😟
            </span>
            <span role="img" aria-label="crying face">
              😢
            </span>
            <span role="img" aria-label="worried face">
              😟
            </span>
            <br />
            YOU LOST!
          </h3>
        )}

        {!isCorrect && (
          <div className="correct-answer">
            <small>The correct answer was:</small>
            <br />
            <strong dangerouslySetInnerHTML={{ __html: correctAnswer }} />
          </div>
        )}

        <button type="button" onClick={handleNextQuestion}>
          Go to next question
          <span role="img" aria-label="finger pointing right">
            👉
          </span>
        </button>
      </div>
    </div>
  );
};

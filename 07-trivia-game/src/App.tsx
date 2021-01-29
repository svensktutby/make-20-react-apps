import React, { FC, useState } from 'react';

import './App.css';
import { Question } from './components/Question';
import { CategorySelector } from './components/CategorySelector';
import { ResultModal } from './components/ResultModal';
import { Scoreboard } from './components/Scoreboard';
import { useTrivia } from './hooks/useTrivia';

export const App: FC = () => {
  const { question, getQuestion, category, setCategory } = useTrivia();
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null);

  const handleQuestionAnswered = (answer: string) => {
    const isAnswerCorrect = answer === question?.correct_answer;

    setIsCorrect(isAnswerCorrect);
  };

  const handleNextQuestion = () => {
    setIsCorrect(null);
    getQuestion();
  };

  return (
    <div className="app">
      {/* show the result modal ----------------------- */}
      {isCorrect !== null && (
        <ResultModal
          isCorrect={isCorrect}
          question={question}
          handleNextQuestion={handleNextQuestion}
        />
      )}

      {/* question header ----------------------- */}
      <div className="question-header">
        <CategorySelector category={category} chooseCategory={setCategory} />
        <Scoreboard isCorrect={isCorrect} />
      </div>

      {/* the question itself ----------------------- */}
      <div className="question-main">
        {question && (
          <Question
            question={question}
            answerQuestion={handleQuestionAnswered}
          />
        )}
      </div>

      {/* question footer ----------------------- */}
      <div className="question-footer">
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

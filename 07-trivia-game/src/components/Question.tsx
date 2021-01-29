import React, { FC } from 'react';
import { v4 } from 'uuid';
import DOMPurify from 'dompurify';
import shuffle from 'lodash.shuffle';

import { QuestionType } from '../api/triviaApi';

type QuestionPropsType = {
  question: null | QuestionType;
  answerQuestion: (answer: string) => void;
};

export const Question: FC<QuestionPropsType> = ({
  question,
  answerQuestion,
}) => {
  const answers =
    question &&
    shuffle([...question.incorrect_answers, question?.correct_answer]);

  const cleanQuestion = question && DOMPurify.sanitize(question?.question);

  return (
    <div className="question">
      {cleanQuestion && (
        <h2 dangerouslySetInnerHTML={{ __html: cleanQuestion }} />
      )}

      {answers &&
        answers.map((answer) => {
          const currentAnswer = DOMPurify.sanitize(answer);

          return (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              key={v4()}
              type="button"
              onClick={() => {
                answerQuestion(currentAnswer);
              }}
              dangerouslySetInnerHTML={{ __html: currentAnswer }}
            />
          );
        })}
    </div>
  );
};

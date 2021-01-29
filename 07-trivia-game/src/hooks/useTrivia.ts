import { useCallback, useEffect, useState } from 'react';

import { QuestionType, triviaApi } from '../api/triviaApi';
import { CategoryIdType } from '../categories';

type UseTriviaType = {
  question: null | QuestionType;
  getQuestion: () => void;
  category: CategoryIdType;
  setCategory: (category: CategoryIdType) => void;
};

export const useTrivia = (): UseTriviaType => {
  const [question, setQuestion] = useState<null | QuestionType>(null);
  const [category, setCategory] = useState<CategoryIdType>('any');

  const getQuestion = useCallback(() => {
    let url = '';
    if (category !== 'any') url += `&category=${category}`;

    triviaApi.getQuestion(url).then((data) => {
      setQuestion(data);
    });
  }, [category]);

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  return { question, getQuestion, category, setCategory };
};

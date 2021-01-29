import { Api } from './api';

export type QuestionType = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

enum ResponseCode {
  Success = 0,
  NoResults = 1,
  InvalidParameter = 2,
  TokenNotFound = 3,
  TokenEmpty = 4,
}

type ApiResponseType = {
  response_code: ResponseCode;
  results: Array<QuestionType>;
};

const baseURL = 'https://opentdb.com/api.php?amount=1';

const API = Api.create({ baseURL });

export const triviaApi = {
  async getQuestion(url: string): Promise<QuestionType> {
    const res = await API.get<ApiResponseType>(url);

    if (res.response_code !== ResponseCode.Success) {
      const message = `An error has occurred: ${
        ResponseCode[res.response_code]
      }`;
      throw new Error(message);
    }

    return res.results[0];
  },
};

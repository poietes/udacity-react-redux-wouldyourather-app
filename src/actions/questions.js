export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_NEW_QUESTION = "SAVE_NEW_QUESTION";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function addQuestionAnswer({ authedUser, qid, answer }) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
  };
}

export function saveNewQuestion(question) {
  return {
    type: SAVE_NEW_QUESTION,
    question
  };
}

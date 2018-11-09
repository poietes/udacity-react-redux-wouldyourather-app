import { getInitialData, saveQuestionAnswer, saveQuestion } from "../utils/api";
import { receiveUsers, addUserAnswer, addUserQuestion } from "./users";
import {
  receiveQuestions,
  addQuestionAnswer,
  saveNewQuestion
} from "./questions";

export function handleInitialData() {
  return dispatch => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}

export function handleSaveQuestionAnswer({ qid, answer }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => {
        dispatch(addUserAnswer({ authedUser, qid, answer }));
        dispatch(addQuestionAnswer({ authedUser, qid, answer }));
      })
      .catch(e => {
        console.warn("Error in handleSaveQuestionAnswer: ", e);
        alert("The was an error saving answer. Try again.");
      });
  };
}

export function handleSaveQuestion({ optionOneText, optionTwoText }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return saveQuestion({ optionOneText, optionTwoText, author: authedUser })
      .then(question => {
        console.log("question", question);
        dispatch(addUserQuestion(question));
        dispatch(saveNewQuestion(question));
      })
      .catch(e => {
        console.warn("Error in handleSaveQuestion: ", e);
        alert("The was an error saving question. Try again.");
      });
  };
}

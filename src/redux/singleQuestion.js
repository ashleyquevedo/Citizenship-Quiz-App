import axios from "axios";

// action type constant:
const SET_RANDOM_QUESTION = "SET_RANDOM_QUESTION";

// action creator:
export const setRandomQuestion = (question) => {
  return {
    type: SET_RANDOM_QUESTION,
    question,
  };
};

// thunk creator:
export const fetchRandomQuestion = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://american-citizenship-test.herokuapp.com/api/random"
      );
      dispatch(setRandomQuestion(response.data));
    } catch (error) {
      throw error;
    }
  };
};

// reducer:
export default function singleQuestionReducer(randomQuestion = {}, action) {
  switch (action.type) {
    case SET_RANDOM_QUESTION:
      return action.question;
    default:
      return randomQuestion;
  }
}

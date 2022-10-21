import { combineReducers } from "redux";
import singleQuestionReducer from "./singleQuestion";

const appReducer = combineReducers({
  question: singleQuestionReducer,
});

export default appReducer;

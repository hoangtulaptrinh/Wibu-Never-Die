import { combineReducers } from "redux";

import category from "./category";
import manga from "./manga";
import currentUser from "./currentUser";

const myReducer = combineReducers({
  category,
  manga,
  currentUser
});

export default myReducer;

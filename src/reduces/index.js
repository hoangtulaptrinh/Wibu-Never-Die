import { combineReducers } from "redux";

import category from "./category";
import manga from "./manga";

const myReducer = combineReducers({
  category,
  manga
});

export default myReducer;

import { combineReducers } from "redux";

import category from "./category";
import manga from "./manga";
import currentUser from "./currentUser";
import textMangaFilter from "./textMangaFilter";

const myReducer = combineReducers({
  category,
  manga,
  currentUser,
  textMangaFilter
});

export default myReducer;

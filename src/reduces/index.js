import { combineReducers } from "redux";

import category from "./category";
import manga from "./manga";
import currentUser from "./currentUser";
import textMangaFilter from "./textMangaFilter";
import imageManga from "./imageManga";

const myReducer = combineReducers({
  category,
  manga,
  currentUser,
  textMangaFilter,
  imageManga
});

export default myReducer;

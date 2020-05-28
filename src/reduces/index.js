import { combineReducers } from "redux";

import category from "./category";
import manga from "./manga";
import currentUser from "./currentUser";
import textMangaFilter from "./textMangaFilter";
import imageManga from "./imageManga";
import statusCreateNewManga from "./statusCreateNewManga";

const myReducer = combineReducers({
  category,
  manga,
  currentUser,
  textMangaFilter,
  imageManga,
  statusCreateNewManga,
});

export default myReducer;

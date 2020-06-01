import { combineReducers } from "redux";

import category from "./category";
import currentUser from "./currentUser";
import imageManga from "./imageManga";
import manga from "./manga";
import newIDManga from "./newIDManga";
import statusCreateNewManga from "./statusCreateNewManga";
import textCategoryFilter from "./textCategoryFilter";
import textMangaFilter from "./textMangaFilter";

const myReducer = combineReducers({
  category,
  currentUser,
  imageManga,
  manga,
  newIDManga,
  statusCreateNewManga,
  textCategoryFilter,
  textMangaFilter,
});

export default myReducer;

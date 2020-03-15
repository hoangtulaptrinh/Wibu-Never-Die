import React from "react";
import { route, withView, mount } from "navi";
import { View } from "react-navi";

import ChooseManga from "../components/main/ChooseManga";
import FavoritesPage from "../components/main/FavoritesPage";
import ReadManga from "../components/main/ReadManga";
import checkHasLogin from "./helper/checkHasLogin";

export const routes = {
  "/Wibu-Never-Die": withView(
    <View />,
    mount({
      "/": route({ title: 'ChooseManga"', view: <ChooseManga /> }),
      "/Favorites-Page": checkHasLogin(
        route({
          title: "FavoritesPage",
          view: <FavoritesPage />
        })
      ),
      "/Read-Manga": route({ title: 'ChooseManga"', view: <ReadManga /> })
    })
  )
};

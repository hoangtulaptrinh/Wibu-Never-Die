import React from "react";
import { route, withView, mount } from "navi";
import { View } from "react-navi";

import Admin from "../components/admin";
import checkHasAdmin from "./helper/checkHasAdmin";
import checkHasLogin from "./helper/checkHasLogin";
import ChooseManga from "../components/main/ChooseManga";
import FavoritesPage from "../components/main/FavoritesPage";
import ReadManga from "../components/main/ReadManga";

export const routes = {
  "/Wibu-Never-Die": withView(
    <View />,
    mount({
      "/": route({ title: 'ChooseManga"', view: <ChooseManga /> }),
      "/Favorites-Page": checkHasLogin(
        route({
          title: "FavoritesPage",
          view: <FavoritesPage />,
        })
      ),
      "/Read-Manga": route({ title: 'ChooseManga"', view: <ReadManga /> }),
      "/Admin": checkHasAdmin(route({ title: "Admin", view: <Admin /> })),
    })
  ),
};

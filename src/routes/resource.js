import React from "react";
import { route, withView, mount } from "navi";
import { View } from "react-navi";

import ChooseManga from "../components/main/ChooseManga";
import FavoritesPage from "../components/main/FavoritesPage";
import checkHasLogin from "./helper/checkHasLogin";

export const routes = {
  "/Wibu-Never-Die": withView(
    <View />,
    mount({
      "/": route({ title: 'ChooseManga"', view: <ChooseManga /> }),
      "/Favorites-Page": checkHasLogin(
        route({
          title: "ChooseManga",
          view: <FavoritesPage />
        })
      )
    })
  )
};

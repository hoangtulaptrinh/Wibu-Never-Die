import React from "react";
import { route } from "navi";
import ChooseManga from "../components/main/ChooseManga";

export const routes = {
  "/Wibu-Never-Die": route({ title: "ChooseManga", view: <ChooseManga /> })
};

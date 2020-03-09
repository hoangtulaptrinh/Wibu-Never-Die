import React from "react";

import LeftSideBar from "../../common/LeftSideBar";
import ListManga from "../../common/ListManga";
import FavoritesPageWrapper from "./FavoritesPage.style";

const FavoritesPage = () => {
  return (
    <FavoritesPageWrapper>
      <div className="favorites-page">
        <LeftSideBar />
        <ListManga />
      </div>
    </FavoritesPageWrapper>
  );
};

export default FavoritesPage;

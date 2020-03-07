import React from "react";

import LeftSideBar from "../../common/LeftSideBar";
import ChooseMangaWrapper from "./ChooseManga.style";
import ListManga from "../../common/ListManga";
const ChooseManga = () => {
  return (
    <ChooseMangaWrapper>
      <div className="choose-manga">
        <LeftSideBar />
        <ListManga />
      </div>
    </ChooseMangaWrapper>
  );
};

export default ChooseManga;

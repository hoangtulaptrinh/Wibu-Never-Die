import React, { useState } from "react";

import LeftSideBar from "../../common/LeftSideBar";
import ChooseMangaWrapper from "./ChooseManga.style";
import ListManga from "../../common/ListManga";
const ChooseManga = () => {
  const [isShowAboutUs, setIsShowAboutUs] = useState(false);
  return (
    <ChooseMangaWrapper>
      <div className="choose-manga">
        <LeftSideBar
          isShowAboutUs={isShowAboutUs}
          setIsShowAboutUs={setIsShowAboutUs}
        />
        <ListManga isShowAboutUs={isShowAboutUs} />
      </div>
    </ChooseMangaWrapper>
  );
};

export default ChooseManga;

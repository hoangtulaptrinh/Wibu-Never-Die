import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigation } from "react-navi";
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import * as actions from "../../../actions/index";
import ReadMangaWrapper from "./ReadManga.style";

const ReadManga = ({ imageManga, getImageManga }) => {
  const { navigate } = useNavigation();
  const urlParam = new URLSearchParams(window.location.search);
  const [currentEpisodes, setCurrentEpisodes] = useState(
    Number(urlParam.get("episodes"))
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    getImageManga({
      id: urlParam.get("id"),
      episodes: String(currentEpisodes),
    });
    // eslint-disable-next-line
  }, [currentEpisodes]);

  const handleGo = (key) => {
    if (key === "back") {
      currentEpisodes > 1 && setCurrentEpisodes(currentEpisodes - 1);
      return;
    }
    currentEpisodes < Number(urlParam.get("total")) &&
      setCurrentEpisodes(currentEpisodes + 1);
  };
  return (
    <ReadMangaWrapper>
      <div className="read-manga" id="read-manga-scroll">
        <div className="header-read-manga">
          <img
            className="cursor"
            src="https://www.epicdope.com/wp-content/uploads/2020/01/manga-logo.png.webp"
            style={{ height: "30px", width: "20%", cursor: "pointer" }}
            alt="img-logo"
            onClick={() => navigate("/Wibu-Never-Die")}
          />
          <Button outline color="info" onClick={() => handleGo("back")}>
            Chapter Trước
          </Button>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle
              caret
            >{`Chapter ${currentEpisodes}`}</DropdownToggle>
            <DropdownMenu>
              {[...Array(Number(urlParam.get("total")))].map((item, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => setCurrentEpisodes(index + 1)}
                >
                  <span className="chapter">{`Chapter ${index + 1}`}</span>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button outline color="info" onClick={() => handleGo("next")}>
            Chapter Sau
          </Button>
        </div>
        <div className="body-read-manga">
          {imageManga.map((page, index) => (
            <img
              key={index}
              src={page}
              className="img-body-read-manga"
              alt="img-body-read-manga"
            />
          ))}
        </div>
      </div>
    </ReadMangaWrapper>
  );
};

const mapStatetoProps = (state) => {
  return {
    imageManga: state.imageManga,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getImageManga: (data) => {
      dispatch(actions.getImageManga(data));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(ReadManga);

import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { useCurrentRoute } from "react-navi";
import axios from "axios";
import find from "lodash/find";

import Manga from "./Manga";
import FavoritesList from "../FavoritesList";
import ListMangaWrapper from "./ListManga.style";
import * as actions from "../../../actions/index";
import {
  toastSuccess,
  toastError,
  toastWarning,
} from "../../../Helper/ToastHelper";

import HeartGif from "../../../asses/image/HeartGif.gif";
import CryGif from "../../../asses/image/CryGif.gif";

const ListManga = ({ manga, getManga, currentUser, textMangaFilter }) => {
  const currentRoute = useCurrentRoute().url.pathname;
  const [showFavoritesList, setShowFavoritesList] = useState(false);
  const [hoverFavoritesList, setHoverFavoritesList] = useState(false);
  const [arrayFavoriteList, setArrayFavoriteList] = useState([]);
  useEffect(() => {
    getManga();
    axios
      .get("/manga")
      .then((res) => setArrayFavoriteList([1, 2, 3, 4, 5]))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);
  const addToFavoritesList = (id) => {
    if (currentRoute === "/Wibu-Never-Die") {
      toastSuccess(
        `Đã Thêm ${
          find(manga, (item) => item.id === id).name
        } Vào Danh Sách Yêu Thích`
      );
      toastError(
        `${
          find(manga, (item) => item.id === id).name
        } Đã Có Trong Vào Danh Sách Yêu Thích`
      );
      toastWarning(
        `${
          find(manga, (item) => item.id === id).name
        } Đã Có Trong Vào Danh Sách Yêu Thích`
      );
      return;
    }
    toastSuccess(
      `Đã Bỏ ${
        find(manga, (item) => item.id === id).name
      } Ra Khỏi Danh Sách Yêu Thích`
    );
    toastError(
      `${
        find(manga, (item) => item.id === id).name
      } Không Có Trong Danh Sách Yêu Thích`
    );
    toastWarning(
      `${
        find(manga, (item) => item.id === id).name
      } Không Có Trong Danh Sách Yêu Thích`
    );
  };
  const listManga = useMemo(() => {
    console.log(manga);
    if (currentRoute === "/Wibu-Never-Die") {
      return manga.filter((item) =>
        item.name.toLowerCase().includes(textMangaFilter.toLowerCase())
      );
    }
    return manga.filter(
      (item) =>
        item.name.toLowerCase().includes(textMangaFilter.toLowerCase()) &&
        arrayFavoriteList.includes(item.id)
    );
  }, [arrayFavoriteList, currentRoute, manga, textMangaFilter]);
  return (
    <ListMangaWrapper>
      <div className="list-manga">
        {!hoverFavoritesList && <div className="background-image-blur" />}
        {hoverFavoritesList && (
          <div
            className="background-image-blur"
            style={{
              background: `url(${
                currentRoute === "/Wibu-Never-Die"
                  ? `${HeartGif}`
                  : currentRoute === "/Wibu-Never-Die/Favorites-Page"
                  ? `${CryGif}`
                  : ""
              })`,
              filter: "blur(0px)",
              WebkitFilter: "blur(0px)",
            }}
          />
        )}
        <div id="main-content-scroll" className="main-content">
          <Row>
            {listManga.map((manga, index) => (
              <Col sm="6" key={index}>
                <div className="cover-manga">
                  <Manga
                    manga={manga}
                    addToFavoritesList={addToFavoritesList}
                    setShowFavoritesList={setShowFavoritesList}
                    showFavoritesList={showFavoritesList}
                  />
                </div>
              </Col>
            ))}
          </Row>
          {localStorage.currentUser !== undefined && showFavoritesList && (
            <FavoritesList setHoverFavoritesList={setHoverFavoritesList} />
          )}
        </div>
      </div>
    </ListMangaWrapper>
  );
};

const mapStatetoProps = (state) => {
  return {
    manga: state.manga,
    currentUser: state.currentUser,
    textMangaFilter: state.textMangaFilter,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getManga: (data) => {
      dispatch(actions.getManga(data));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(ListManga);

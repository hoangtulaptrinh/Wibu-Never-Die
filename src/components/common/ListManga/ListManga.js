import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { useCurrentRoute } from "react-navi";
import axios from "axios";
import find from "lodash/find";
import isEmpty from "lodash/isEmpty";

import Manga from "./Manga";
import FavoritesList from "../FavoritesList";
import ListMangaWrapper from "./ListManga.style";
import * as actions from "../../../actions/index";
import {
  toastSuccess,
  toastWarning,
  toastError,
} from "../../../Helper/ToastHelper";
import classes from "./BackgroundVideo.module.css";

import HeartGif from "../../../asses/image/HeartGif.gif";
import CryGif from "../../../asses/image/CryGif.gif";
import video from "../../../asses/video/videoplayback.mp4";
import AuthorDeveloper from "./AuthorDeveloper";

const ListManga = ({
  manga,
  getManga,
  textMangaFilter,
  textCategoryFilter,
}) => {
  const currentRoute = useCurrentRoute().url.pathname;
  const [showFavoritesList, setShowFavoritesList] = useState(false);
  const [hoverFavoritesList, setHoverFavoritesList] = useState(false);
  const [arrayFavoriteList, setArrayFavoriteList] = useState([]);
  const currentUser1 = localStorage.currentUser;
  const token =
    !!currentUser1 &&
    !isEmpty(JSON.parse(currentUser1)) &&
    JSON.parse(currentUser1).token;

  var config = {
    headers: { Authorization: "Bearer " + token },
  };
  useEffect(() => {
    getManga();
    axios
      .get(`${actions.baseHost}/favourites`, config)
      .then((res) => setArrayFavoriteList(res.data.map((item) => item.id)))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);
  const addToFavoritesList = (id) => {
    if (currentRoute === "/Wibu-Never-Die") {
      arrayFavoriteList.includes(id) &&
        toastWarning(
          `${
            find(manga, (item) => item.id === id).name
          } Đã Có Trong Vào Danh Sách Yêu Thích`
        );
      !arrayFavoriteList.includes(id) &&
        axios
          .post(
            `${actions.baseHost}/favourites`,
            {
              mangaId: id,
            },
            config
          )
          .then((res) => {
            toastSuccess(
              `Đã Thêm ${
                find(manga, (item) => item.id === id).name
              } Vào Danh Sách Yêu Thích`
            );
            axios
              .get(`${actions.baseHost}/favourites`, config)
              .then((res) =>
                setArrayFavoriteList(res.data.map((item) => item.id))
              )
              .catch((err) => console.log(err));
          })
          .catch((err) => toastError(err));
      return;
    }
    !arrayFavoriteList.includes(id) &&
      toastWarning(
        `${
          find(manga, (item) => item.id === id).name
        } Không Có Trong Danh Sách Yêu Thích`
      );
    arrayFavoriteList.includes(id) &&
      axios
        .delete(`${actions.baseHost}/favourites`, {
          headers: { Authorization: "Bearer " + token },
          data: {
            mangaId: id,
          },
        })
        .then((res) => {
          toastSuccess(
            `Đã Bỏ ${
              find(manga, (item) => item.id === id).name
            } Ra Khỏi Danh Sách Yêu Thích`
          );
          axios
            .get(`${actions.baseHost}/favourites`, config)
            .then((res) =>
              setArrayFavoriteList(res.data.map((item) => item.id))
            )
            .catch((err) => console.log(err));
        })
        .catch((err) => toastError(err));
    return;
  };
  const listManga = useMemo(() => {
    if (currentRoute === "/Wibu-Never-Die") {
      return manga.filter(
        (item) =>
          item.name.toLowerCase().includes(textMangaFilter.toLowerCase()) &&
          item.category.includes(textCategoryFilter.toLowerCase())
      );
    }
    return manga.filter(
      (item) =>
        item.name.toLowerCase().includes(textMangaFilter.toLowerCase()) &&
        item.category.includes(textCategoryFilter.toLowerCase()) &&
        arrayFavoriteList.includes(item.id)
    );
  }, [
    arrayFavoriteList,
    currentRoute,
    manga,
    textCategoryFilter,
    textMangaFilter,
  ]);

  return (
    <ListMangaWrapper>
      <div className="list-manga">
        <video
          autoPlay="autoplay"
          loop="loop"
          muted
          className={classes.Video}
          style={{ position: "absolute" }}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

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
          <AuthorDeveloper />
        </div>
      </div>
    </ListMangaWrapper>
  );
};

const mapStatetoProps = (state) => {
  return {
    manga: state.manga,
    textMangaFilter: state.textMangaFilter,
    textCategoryFilter: state.textCategoryFilter,
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

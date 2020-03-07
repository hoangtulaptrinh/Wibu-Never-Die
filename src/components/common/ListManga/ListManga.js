import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";

import Manga from "./Manga";
import FavoritesList from "../FavoritesList";
import ListMangaWrapper from "./ListManga.style";
import * as actions from "../../../actions/index";

const ListManga = ({ manga, getManga }) => {
  useEffect(() => {
    getManga();
    // eslint-disable-next-line
  }, []);
  const addToFavoritesList = id => {
    console.log(id);
  };
  return (
    <ListMangaWrapper>
      <div className="list-manga">
        <div className="background-image-blur" />
        <div id="main-content-scroll" className="main-content">
          <Row>
            {manga.map((manga, index) => (
              <Col sm="6" key={index}>
                <div className="cover-manga">
                  <Manga
                    manga={manga}
                    addToFavoritesList={addToFavoritesList}
                  />
                </div>
              </Col>
            ))}
          </Row>
          <FavoritesList />
        </div>
      </div>
    </ListMangaWrapper>
  );
};

const mapStatetoProps = state => {
  return { manga: state.manga };
};
const mapDispatchToProps = dispatch => {
  return {
    getManga: data => {
      dispatch(actions.getManga(data));
    }
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(ListManga);

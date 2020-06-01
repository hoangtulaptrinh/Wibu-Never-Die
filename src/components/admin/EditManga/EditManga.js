import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useNavigation } from "react-navi";
import { Row, Col, Button } from "reactstrap";
import Manga from "../../common/ListManga/Manga";
import EditMangaWrapper from "./EditManga.style";
import * as actions from "../../../actions/index";

const EditManga = ({
  manga,
  getManga,
  currentUser,
  textMangaFilter,
  setScreen,
  setIDManga,
}) => {
  const { navigate } = useNavigation();
  useEffect(() => {
    getManga();
    // eslint-disable-next-line
  }, []);

  const listManga = useMemo(
    () =>
      manga.filter((item) =>
        item.name.toLowerCase().includes(textMangaFilter.toLowerCase())
      ),
    [manga, textMangaFilter]
  );

  return (
    <EditMangaWrapper>
      <div className="list-manga">
        <div className="background-image-blur" />
        <div id="main-content-scroll" className="main-content">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button color="info" onClick={() => navigate("/Wibu-Never-Die")}>
              Home
            </Button>
          </div>
          <Row>
            {listManga.map((manga, index) => (
              <Col sm="6" key={index}>
                <div className="cover-manga">
                  <Manga
                    manga={manga}
                    isAdmin
                    setScreen={() => setScreen("upload")}
                    setIDManga={setIDManga}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </EditMangaWrapper>
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

export default connect(mapStatetoProps, mapDispatchToProps)(EditManga);

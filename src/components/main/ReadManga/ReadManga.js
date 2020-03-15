import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigation } from "react-navi";
import {
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import * as actions from "../../../actions/index";
import ReadMangaWrapper from "./ReadManga.style";

const ReadManga = ({ imageManga, getImageManga }) => {
  const { navigate } = useNavigation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  useEffect(() => {
    getImageManga();
    // eslint-disable-next-line
  }, []);
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
          <Button outline color="info">
            Chapter Trước
          </Button>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>{`One-Piece - Chapter 1`}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <span className="chapter">One-Piece - Chapter 1</span>
              </DropdownItem>
              <DropdownItem>
                <span className="chapter">One-Piece - Chapter 2</span>
              </DropdownItem>
              <DropdownItem>
                <span className="chapter">One-Piece - Chapter 3</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button outline color="info">
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

const mapStatetoProps = state => {
  return {
    imageManga: state.imageManga
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getImageManga: data => {
      dispatch(actions.getImageManga(data));
    }
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(ReadManga);

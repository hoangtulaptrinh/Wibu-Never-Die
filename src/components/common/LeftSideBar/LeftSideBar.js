import React, { useState, useMemo, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { LogIn, LogOut } from "react-feather";
import classNames from "classnames";
import { connect } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import isEmpty from "lodash/isEmpty";
import { Heart } from "react-feather";

import * as actions from "../../../actions/index";
import LeftSideBarWrapper from "./LeftSideBar.style";

const LeftSideBar = ({
  category,
  getCategory,
  currentUser,
  logIn,
  setTextMangaFilter
}) => {
  const [searchText, setSearchText] = useState("");
  const listCategory = useMemo(
    () =>
      category.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      ),
    [category, searchText]
  );
  const [currentCategoryMouseDown, setCurrentCategoryMouseDown] = useState(-1);
  const [currentCategoryOnClick, setCurrentCategoryOnClick] = useState(-1);
  const onClickCategory = id => {
    setCurrentCategoryOnClick(id);
  };
  useEffect(() => {
    getCategory();
    // eslint-disable-next-line
  }, []);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(8)
        .max(15)
        .required()
    }),
    onSubmit: values => {
      logIn(values);
      toggle();
    }
  });
  const [filterType, setFilterType] = useState("Category");
  const changeFilterType = () => {
    if (filterType === "Category") return setFilterType("Manga");
    return setFilterType("Category");
  };
  const letSetSearchText = value => {
    if (filterType === "Category") return setSearchText(value);
    return setTextMangaFilter(value);
  };
  return (
    <LeftSideBarWrapper>
      <div className="left-side-bar">
        <img
          className="cursor"
          src="https://www.epicdope.com/wp-content/uploads/2020/01/manga-logo.png.webp"
          style={{ height: "90px", width: "100%" }}
          alt="img-logo"
        />
        <div className="action-group">
          <div className="search-type-favorites">
            <label className="rocker rocker-small">
              <input type="checkbox" onChange={changeFilterType} />
              <span className="switch-left">MA</span>
              <span className="switch-right">CA</span>
            </label>
            {!!currentUser.id && <Heart size="50" color="pink" />}
          </div>
          <div className="wrapper">
            <div className="search-icon">
              <input
                className="search-circle"
                type="text"
                onChange={e => letSetSearchText(e.target.value)}
              />
              <div className="search-bar" />
            </div>
          </div>
        </div>
        <div id="left-side-bar-scroll" className="list-category">
          {listCategory.map((category, index) => (
            <div
              className={classNames("category cursor", {
                categorySelected: currentCategoryOnClick === category.id,
                removeHover: currentCategoryMouseDown === category.id
              })}
              key={index}
              onClick={() => onClickCategory(category.id)}
              onMouseDown={() => setCurrentCategoryMouseDown(category.id)}
            >
              {`${category.name} (${category.amount})`}
            </div>
          ))}
        </div>
        <div className="log-in-log-out">
          {!currentUser.id && (
            <LogIn
              className="e-resize"
              size="50"
              color="#00a8cc"
              onClick={toggle}
            />
          )}
          <LogOut className="ne-resize" size="50" color="#ff5151" />
        </div>
        <Modal isOpen={modal} toggle={toggle}>
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader toggle={toggle}>Log In</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: "red" }}>{formik.errors.email}</div>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div style={{ color: "red" }}>{formik.errors.password}</div>
                ) : null}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                disabled={!isEmpty(formik.errors)}
                color="primary"
                type="submit"
              >
                Đăng Nhập
              </Button>
              <Button color="secondary" onClick={toggle}>
                Lúc Khác
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    </LeftSideBarWrapper>
  );
};

const mapStatetoProps = state => {
  return {
    category: state.category,
    currentUser: state.currentUser,
    filterType: state.filterType
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getCategory: data => {
      dispatch(actions.getCategory(data));
    },
    logIn: data => {
      dispatch(actions.logIn(data));
    },
    setTextMangaFilter: data => {
      dispatch(actions.setTextMangaFilter(data));
    }
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(LeftSideBar);

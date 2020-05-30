import React, { useState, useMemo, useEffect } from "react";
import { useNavigation, useCurrentRoute } from "react-navi";
import { toastSuccess, toastError } from "../../../Helper/ToastHelper";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { LogIn, LogOut, Heart, UserCheck } from "react-feather";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import isEmpty from "lodash/isEmpty";

import * as actions from "../../../actions/index";
import LeftSideBarWrapper from "./LeftSideBar.style";

const LeftSideBar = ({
  category,
  getCategory,
  currentUser,
  setCurrentUser,
  logIn,
  setTextMangaFilter,
}) => {
  const { navigate } = useNavigation();
  const [searchText, setSearchText] = useState("");
  const listCategory = useMemo(
    () =>
      category.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      ),
    [category, searchText]
  );
  const [currentCategoryMouseDown, setCurrentCategoryMouseDown] = useState(-1);
  const [currentCategoryOnClick, setCurrentCategoryOnClick] = useState(-1);
  const onClickCategory = (id) => {
    setCurrentCategoryOnClick(id);
  };
  useEffect(() => {
    getCategory();
    // eslint-disable-next-line
  }, []);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modal1, setModal1] = useState(false);
  const toggle1 = () => setModal1(!modal1);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("không đúng định dạng mail")
        .required("hãy điền mail của bạn"),
      password: Yup.string()
        .min(8)
        .max(15)
        .required("hãy nhập mật khẩu của bạn"),
    }),
    onSubmit: (values) => {
      logIn(values);
      toggle();
    },
  });
  const [filterType, setFilterType] = useState("Category");
  const changeFilterType = () => {
    if (filterType === "Category") return setFilterType("Manga");
    return setFilterType("Category");
  };
  const letSetSearchText = (value) => {
    if (filterType === "Category") return setSearchText(value);
    return setTextMangaFilter(value);
  };
  const letLogOut = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser({});
    navigate("/Wibu-Never-Die");
  };

  const role = () => {
    if (
      !!localStorage.currentUser &&
      !isEmpty(JSON.parse(localStorage.currentUser))
    ) {
      return JSON.parse(localStorage.currentUser).role === "admin";
    }
    return false;
  };
  const currentRoute = useCurrentRoute().url.pathname;
  const signUp = () => {
    toggle();
    toggle1();
  };
  const formikSignUp = useFormik({
    initialValues: { name: "", email: "", password: "", passwordRepeat: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Hãy điền tên của bạn"),
      email: Yup.string().email().required("Hãy điền email của bạn"),
      password: Yup.string()
        .min(8)
        .max(15)
        .required("Hãy điền mật khẩu của bạn"),
      passwordRepeat: Yup.string()
        .min(8)
        .max(15)
        .required("hãy nhập lại mật khẩu của bạn 1 lần nữa")
        .oneOf(
          [Yup.ref("password"), null],
          "mật khẩu không trùng với mật khẩu ở trên"
        ),
    }),
    onSubmit: (values) => {
      axios
        .post("/log_in", values)
        .then((res) => {
          toastSuccess("Bạn Đã Đăng Ký Thành Công Hãy Đăng Nhập Đi");
          toggle1();
        })
        .catch((err) => toastError(err));
    },
  });
  return (
    <LeftSideBarWrapper>
      <div className="left-side-bar">
        <img
          className="cursor"
          src="https://www.epicdope.com/wp-content/uploads/2020/01/manga-logo.png.webp"
          style={{ height: "90px", width: "100%" }}
          alt="img-logo"
          onClick={() => navigate("/Wibu-Never-Die")}
        />
        <div className="action-group">
          <div className="search-type-favorites">
            <label className="rocker rocker-small">
              <input type="checkbox" onChange={changeFilterType} />
              <span className="switch-left">MA</span>
              <span className="switch-right">CA</span>
            </label>
            {localStorage.currentUser !== undefined &&
              currentRoute !== "/Wibu-Never-Die/Favorites-Page" && (
                <Heart
                  size="50"
                  color="pink"
                  className="cursor"
                  onClick={() => navigate("/Wibu-Never-Die/Favorites-Page")}
                />
              )}
          </div>
          <div className="wrapper">
            <div className="search-icon">
              <input
                className="search-circle"
                type="text"
                onChange={(e) => letSetSearchText(e.target.value)}
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
                removeHover: currentCategoryMouseDown === category.id,
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
          {!localStorage.currentUser && (
            <LogIn
              className="e-resize"
              size="50"
              color="#00a8cc"
              onClick={toggle}
            />
          )}
          {role() && (
            <UserCheck
              className="e-resize"
              size="50"
              color="#00a8cc"
              onClick={() => navigate("/Wibu-Never-Die/Admin")}
            />
          )}
          <LogOut
            className="ne-resize"
            size="50"
            color="#ff5151"
            onClick={letLogOut}
          />
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
                color="success"
                type="submit"
              >
                Đăng Nhập
              </Button>
              <Button color="primary" onClick={signUp}>
                Đăng Ký
              </Button>
            </ModalFooter>
          </form>
        </Modal>

        <Modal isOpen={modal1} toggle={toggle1}>
          <form onSubmit={formikSignUp.handleSubmit}>
            <ModalHeader toggle={toggle1}>Log In</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="exampleName">Name</Label>
                <Input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  onChange={formikSignUp.handleChange}
                  onBlur={formikSignUp.handleBlur}
                  value={formikSignUp.values.name}
                />
                {formikSignUp.touched.name && formikSignUp.errors.name ? (
                  <div style={{ color: "red" }}>{formikSignUp.errors.name}</div>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  onChange={formikSignUp.handleChange}
                  onBlur={formikSignUp.handleBlur}
                  value={formikSignUp.values.email}
                />
                {formikSignUp.touched.email && formikSignUp.errors.email ? (
                  <div style={{ color: "red" }}>
                    {formikSignUp.errors.email}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  onChange={formikSignUp.handleChange}
                  onBlur={formikSignUp.handleBlur}
                  value={formikSignUp.values.password}
                />
                {formikSignUp.touched.password &&
                formikSignUp.errors.password ? (
                  <div style={{ color: "red" }}>
                    {formikSignUp.errors.password}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label for="example Password Repeat">Password Repeat</Label>
                <Input
                  type="passwordRepeat"
                  name="passwordRepeat"
                  id="passwordRepeat"
                  placeholder="Your Password Repeat"
                  onChange={formikSignUp.handleChange}
                  onBlur={formikSignUp.handleBlur}
                  value={formikSignUp.values.passwordRepeat}
                />
                {formikSignUp.touched.passwordRepeat &&
                formikSignUp.errors.passwordRepeat ? (
                  <div style={{ color: "red" }}>
                    {formikSignUp.errors.passwordRepeat}
                  </div>
                ) : null}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                disabled={!isEmpty(formikSignUp.errors)}
                color="success"
                type="submit"
              >
                Đăng Ký
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    </LeftSideBarWrapper>
  );
};

const mapStatetoProps = (state) => {
  return {
    category: state.category,
    currentUser: state.currentUser,
    filterType: state.filterType,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: (data) => {
      dispatch(actions.getCategory(data));
    },
    logIn: (data) => {
      dispatch(actions.logIn(data));
    },
    setTextMangaFilter: (data) => {
      dispatch(actions.setTextMangaFilter(data));
    },
    setCurrentUser: (data) => {
      dispatch(actions.setCurrentUser(data));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(LeftSideBar);

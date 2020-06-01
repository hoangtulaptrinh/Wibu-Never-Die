import actionTypes from "../const/actionTypes";
import axios from "axios";
// import MockAdapter from "axios-mock-adapter";

// import fakeData from "../fakeData";
import { toastSuccess, toastError } from "../Helper/ToastHelper";
import isEmpty from "lodash/isEmpty";

// var mock = new MockAdapter(axios);

// mock.onGet("/manga").reply(200, fakeData.manga);
// mock.onPost("/log_in").reply(200, fakeData.log_in);
// mock.onGet("/image_manga").reply(200, fakeData.image_manga);

export const baseHost = "http://192.168.1.111:8080";

export const getManga = () => {
  return (dispatch) => {
    axios
      .get(`${baseHost}/mangas`)
      .then((res) => {
        dispatch(setManga(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setManga = (data) => {
  return { type: actionTypes.setManga, data: data };
};

export const logIn = (data) => {
  return (dispatch) => {
    axios
      .post(`${baseHost}/login`, data, { withCredentials: true })
      .then((res) => {
        const user = {
          id: 1,
          name: res.data.username,
          role: res.data.roles[0] === "ROLE_ADMIN" ? "admin" : "user",
          token: res.data.accessToken,
        };
        dispatch(setCurrentUser(user));
        toastSuccess("Đăng Nhập Thành Công");
      })
      .catch((error) => {
        console.log(error);
        toastError("Sai Tài Khoản Hoặc Mật Khẩu");
      });
  };
};

export const setCurrentUser = (data) => {
  return { type: actionTypes.setCurrentUser, data: data };
};

export const getImageManga = (data) => {
  return (dispatch) => {
    axios
      .get(`${baseHost}/mangas/${data.id}/chapters`, data)
      .then((res) => {
        dispatch(
          setImageManga(
            res.data[data.episodes - 1].pages.map(
              (item) => `${baseHost}/uploads/${item.imagePath}`
            )
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const createNewManga = (data) => {
  const currentUser1 = localStorage.currentUser;
  const token =
    !!currentUser1 &&
    !isEmpty(JSON.parse(currentUser1)) &&
    JSON.parse(currentUser1).token;

  var config = {
    headers: { Authorization: "Bearer " + token },
  };
  return (dispatch) => {
    const obj = new FormData();
    obj.append("file", data.cover);
    obj.append("name", data.name);
    obj.append("category", data.category);
    obj.append("title", data.title);

    axios
      .post(`${baseHost}/mangas`, obj, config)
      .then((res) => {
        dispatch(setCreateNewManga(true));
        dispatch(setNewIDManga(res.data.id));
      })
      .catch((error) => {
        dispatch(setCreateNewManga(false));
      });
  };
};

export const setNewIDManga = (data) => {
  return { type: actionTypes.setNewIDManga, data: data };
};

export const setCreateNewManga = (data) => {
  return { type: actionTypes.setCreateNewManga, data: data };
};

export const setImageManga = (data) => {
  return { type: actionTypes.setImageManga, data: data };
};

export const setTextCategoryFilter = (data) => {
  return { type: actionTypes.setTextCategoryFilter, data: data };
};

export const setTextMangaFilter = (data) => {
  return { type: actionTypes.setTextMangaFilter, data: data };
};

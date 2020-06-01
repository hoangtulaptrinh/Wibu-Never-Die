import actionTypes from "../const/actionTypes";
import axios from "axios";
// import MockAdapter from "axios-mock-adapter";

// import fakeData from "../fakeData";
import { toastSuccess, toastError } from "../Helper/ToastHelper";

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
  console.log(data);
  return (dispatch) => {
    axios
      .get("/image_manga", data)
      .then((res) => {
        dispatch(setImageManga(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const createNewManga = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .get("/image_manga", data)
      .then((res) => {
        dispatch(setCreateNewManga(true));
      })
      .catch((error) => {
        dispatch(setCreateNewManga(false));
      });
  };
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

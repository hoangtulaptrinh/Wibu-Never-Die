import actionTypes from "../const/actionTypes";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import fakeData from "../fakeData";
import { toastSuccess, toastError } from "../Helper/ToastHelper";
var mock = new MockAdapter(axios);

mock.onGet("/category").reply(200, fakeData.category);
mock.onGet("/manga").reply(200, fakeData.manga);
mock.onPost("/log_in").reply(200, fakeData.log_in);
mock.onGet("/image_manga").reply(200, fakeData.image_manga);

export const getCategory = () => {
  return (dispatch) => {
    axios
      .get("/category")
      .then((res) => {
        dispatch(setCATEGORY(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setCATEGORY = (data) => {
  return { type: actionTypes.setCATEGORY, data: data };
};

export const getManga = () => {
  return (dispatch) => {
    axios
      .get("/manga")
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
      .post("/log_in", data)
      .then((res) => {
        dispatch(setCurrentUser(res.data));
        toastSuccess("Đăng Nhập Thành Công");
      })
      .catch((error) => {
        console.log(error);
        toastError(error);
      });
  };
};

export const setCurrentUser = (data) => {
  return { type: actionTypes.setCurrentUser, data: data };
};

export const getImageManga = (data) => {
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
    // axios
    //   .get("/image_manga", data)
    //   .then((res) => {
    //     dispatch(setImageManga(res.data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
};

export const setImageManga = (data) => {
  return { type: actionTypes.setImageManga, data: data };
};

export const setTextMangaFilter = (data) => {
  return { type: actionTypes.setTextMangaFilter, data: data };
};

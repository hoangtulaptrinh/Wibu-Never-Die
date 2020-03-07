import actionTypes from "../const/actionTypes";
import axios from "axios";

import fakeData from "../fakeData";
import MockAdapter from "axios-mock-adapter";

var mock = new MockAdapter(axios);

mock.onGet("/category").reply(200, fakeData.category);
mock.onGet("/manga").reply(200, fakeData.manga);

export const getCategory = () => {
  return dispatch => {
    axios
      .get("/category")
      .then(res => {
        dispatch(setCATEGORY(res.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const setCATEGORY = data => {
  return { type: actionTypes.setCATEGORY, data: data };
};

export const getManga = () => {
  return dispatch => {
    axios
      .get("/manga")
      .then(res => {
        dispatch(setManga(res.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const setManga = data => {
  return { type: actionTypes.setManga, data: data };
};

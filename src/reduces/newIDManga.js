import actionTypes from "../const/actionTypes";

var initialState = null;
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.setNewIDManga:
      return action.data;

    default:
      return state;
  }
};

export default myReducer;

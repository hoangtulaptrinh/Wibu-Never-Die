import actionTypes from "../const/actionTypes";

var initialState = {};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.setCurrentUser:
      if (!!action.data.id) {
        localStorage.currentUser = JSON.stringify(action.data);
      }
      return action.data;

    default:
      return state;
  }
};

export default myReducer;

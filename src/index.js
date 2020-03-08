import React from "react";
import { Router, View } from "react-navi";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore, applyMiddleware } from "redux";
import myReducer from "./reduces/index";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import "./index.css";
import * as serviceWorker from "./serviceWorker";
import routes from "./routes";
const store = createStore(myReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Router routes={routes}>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <View />
        <ToastContainer />
      </DndProvider>
    </Provider>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();

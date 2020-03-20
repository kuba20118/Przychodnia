import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./state";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-contexify/dist/ReactContexify.min.css";
import "./assets/scss/main.scss";
import history from "./routing/history";
import { authenticateAsync } from "./state/ducks/auth/actions";

const initialState = (window as any).initialReduxState;
const store = configureStore(initialState);

const token = localStorage.getItem("przychodnia-jwt");

if (token) {
  store.dispatch(authenticateAsync.success());
}

const createApp = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
};

ReactDOM.render(createApp(), document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

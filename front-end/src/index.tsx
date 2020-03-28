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
import "./assets/scss/main.scss";
import history from "./routing/history";
import { authenticateAsync } from "./state/ducks/auth/actions";
import { setCurrentUser } from "./state/ducks/user/actions";

const initialState = (window as any).initialReduxState;
const store = configureStore(initialState);

/**
 * Authentication and authorization
 * @description
 * It's not the best way to authenticate the user
 * but the real protection is handled by server, which set up
 * 12h token. Every API request is sent with bearer token (saved in localstorage).
 * If token is not valid, the api response with error 401 Anauthorized.
 * This error automatically redirect to login page and clears localStorage from
 * token and user data.
 * TODO: handle the authentication process in a service
 * TODO: wrap every api call with middleware catching unathorized responses to redirect to login page
 */

const token = localStorage.getItem("przychodnia-jwt");
const userStr = localStorage.getItem("przychodnia-user");

if (userStr) {
  try {
    const userObj = JSON.parse(userStr);
    if (token && userObj) {
      store.dispatch(authenticateAsync.success());
      store.dispatch(setCurrentUser(userObj));
    }
  } catch (err) {
    store.dispatch(
      authenticateAsync.failure("The localstorage data is not valid.")
    );
  }
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

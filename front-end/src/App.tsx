import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import configureStore from "./state";
import AdminLayout from "./layouts/Admin";

const initialState = (window as any).initialReduxState;
const store = configureStore(initialState);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Redirect from="/" to="/admin/panel-glowny" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

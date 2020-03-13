import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import configureStore from "./state";
import Home from "./components/Home";
import About from "./components/About";

const initialState = (window as any).initialReduxState;
const store = configureStore(initialState);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

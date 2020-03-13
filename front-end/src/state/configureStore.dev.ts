import { Store, createStore, applyMiddleware } from "redux";
import { IApplicationState, rootReducer, rootSaga } from "./ducks";
import sagaMiddleware from "./middleware/sagas";

/**
 * Configures the redux store and applies middlewares to it
 * @param initialState initial redux state
 */
export default function configureStore(
  initialState: IApplicationState
): Store<IApplicationState> {
  const middlewares = [sagaMiddleware];

  // Add redux logger if in development mode
  if (process.env.NODE_ENV === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

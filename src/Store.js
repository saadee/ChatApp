import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./_reducers/indexReducer";
const intialState = {};
const middleware = [thunk];
let store = createStore(
  rootReducer,
  intialState,
  applyMiddleware(...middleware)
);

export default store;

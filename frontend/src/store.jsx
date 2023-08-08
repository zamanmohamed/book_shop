import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productUpdateReducer,
} from "./reducers/productReducers";

import {
  adminListReducer,
  adminDetailsReducer,
  adminCreateReducer,
  adminUpdateReducer,
} from "./reducers/adminReducers";

const redcer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  adminList: adminListReducer,
  adminDetails: adminDetailsReducer,
  adminCreate: adminCreateReducer,
  adminUpdate: adminUpdateReducer,
});

const middleware = [thunk];

const store = createStore(
  redcer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import {orderReducer} from './orderReducer'


const reducers = combineReducers({
  allProducts: productReducer,
  allOrders: orderReducer,
});

export {reducers}

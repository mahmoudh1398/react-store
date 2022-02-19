import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import {orderReducer} from './orderReducer';
import {categoriesReducer} from './categoriesReducer';


const reducers = combineReducers({
  allProducts: productReducer,
  allOrders: orderReducer,
  allCategories: categoriesReducer
});

export {reducers}

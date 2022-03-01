import { combineReducers } from "redux";
import { productsReducer } from "./productsReducer";
import {ordersReducer} from './ordersReducer';
import {categoriesReducer} from './categoriesReducer';
import {productReducer} from "./productReducer";


const reducers = combineReducers({
  allProducts: productsReducer,
  allOrders: ordersReducer,
  allCategories: categoriesReducer,
  product: productReducer,
});

export {reducers}

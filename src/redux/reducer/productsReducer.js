import { ActionTypes } from "redux/action/productsAction";

const initialState = {
  products: [],
};

export const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return {...state,products:payload}
    case ActionTypes.FILTERED_PRODUCTS:
      return {...state,products:payload}
    default:
      return state;
  }
};

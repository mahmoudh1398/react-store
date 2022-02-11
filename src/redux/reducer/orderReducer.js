import { ActionTypes } from 'redux/action/ordersAction';

const initialState = {
  orders: [],
};

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ORDERS:
      return { ...state, orders: payload };
    default:
      return state;
  }
};

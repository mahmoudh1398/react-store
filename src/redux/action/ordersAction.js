export const ActionTypes = {
  SET_ORDERS: "SET_ORDERS",
  SELECTED_ORDER: "SELECTED_ORDER",
  REMOVE_SELECTED_ORDERS: "REMOVE_SELECTED_ORDER",
};

export const setOrders = (orders) => {
  return {
    type: ActionTypes.SET_ORDERS,
    payload: orders,
  };
};

export const selectedOrder = (order) => {
  return {
    type: ActionTypes.SELECTED_ORDER,
    payload: order,
  };
};

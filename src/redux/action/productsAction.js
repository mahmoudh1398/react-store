const ActionTypes = {
  SET_PRODUCTS: "SET_PRODUCTS",
  FILTERED_PRODUCTS: "FILTERED_PRODUCTS",
  REMOVE_SELECTED_PRODUCT: "REMOVE_SELECTED_PRODUCT",
};

const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

const filteredProducts = (products) => {
  return {
    type: ActionTypes.FILTERED_PRODUCTS,
    payload: products,
  };
};

export {ActionTypes, setProducts, filteredProducts};

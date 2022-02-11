import http from "services/http.service";

export const getProducts = async (dispatch) => {
  try {
    const response = await http.get(`/products`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

import http from "services/http.service";

export const getOrders = async (dispatch) => {
  try {
    const response = await http.get(`/orders`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

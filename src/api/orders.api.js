import http from "services/http.service";

export const getOrders = async (currentPage, category) => {
  try {
    const response = await http.get(`/orders?_page=${currentPage}&_limit=6&delivered=${category}`);
    return [response.data, response.headers["x-total-count"]];
  } catch (e) {
    return Promise.reject(e);
  }
};

import http from "services/http.service";

export const getProducts = async (currentPage) => {
  try {
    const response = await http.get(`/products?_page=${currentPage}`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

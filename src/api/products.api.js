import http from "services/http.service";

export const getProducts = async (currentPage) => {
  try {
    const response = await http.get(`/products?_page=${currentPage}&_limit=5`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getFilteredProducts = async (currentPage, category) => {
  try {
    const response = await http.get(`/products?_page=${currentPage}&_limit=5&category.name=${category}`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

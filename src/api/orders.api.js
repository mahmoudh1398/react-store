import http from "services/http.service";
import {ORDERS} from "config/url.config";

export const getOrders = async (currentPage, category) => {
  try {
    const response = await http.get(`/orders?_page=${currentPage}&_limit=6&delivered=${category}`);
    return [response.data, response.headers["x-total-count"]];
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postOrder = async (data) => {
  try {
    const response = await http.post(ORDERS, data);
    return  response.data
  }catch(e){
    return Promise.reject(e);
  }
}

export const editOrder = async (id ,data) => {
  try {
    const response = await http.put(`${ORDERS}/${id}`,data)
    return  response.data
  }catch(e){
    return e
  }
}

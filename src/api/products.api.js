import http from "services/http.service";
import {UPLOAD_IMG, PRODUCTS} from 'config/url.config';

export const getProducts = async (currentPage) => {
  try {
    const response = await http.get(`/products?_page=${currentPage}&_limit=6`);
    return [response.data, response.headers["x-total-count"]];
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getFilteredProducts = async (currentPage, category) => {
  try {
    const response = await http.get(`/products?_page=${currentPage}&_limit=6&category.name=${category}`);
    return [response.data, response.headers["x-total-count"]];
  } catch (e) {
    return Promise.reject(e);
  }
};

export async function uploadImg(data) {
  try {
    const response = await http.post(UPLOAD_IMG, data)
    console.log(response.data)
    return  response.data
  }catch(e){
    return e
  }
}

export async function editData({id ,data}) {
  try {
    const response = await http.put(`${PRODUCTS}/${id}`,data)
    console.log(response.data)
    return  response.data
  }catch(e){
    return e
  }
}

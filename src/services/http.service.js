import axios from 'axios';
import {LOGIN} from 'config/url.config';
import {ACCESS_TOKEN, BASE_URL, IS_LOGGED_IN} from 'config/variables.config';
import {toast} from 'react-toastify';
import {PATHS} from "config/routes.config";

class HttpService {
  constructor() {
    axios.defaults.baseURL = BASE_URL;
    
    axios.interceptors.request.use((config) => {
      // console.log('CONFIG: ', config);
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (config.url !== LOGIN) {
        config.headers['token'] = `${token}`
      }
      
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
    
    axios.interceptors.response.use((response) => {
         // console.log('Interceptor response success', response);
         return response;
       },
       (error) => {
         // console.log('Interceptor response error' , error.response && (error.response.data === 'Token Expired!' || error.response.data === 'Invalid Token!'));
         if (error.response && (error.response.data === 'Token Expired!' || error.response.data === 'Invalid Token!')) {
           localStorage.setItem(IS_LOGGED_IN, false.toString());
           window.location.href = 'http://localhost:3000' + PATHS.PANEL_LOGIN;
         } else {
           toast.error(error.response.data)
           
         }
         return Promise.reject(error);
       })
  }
  
  get(url, config) {
    return axios.get(url, config);
  }
  
  post(url, data, config) {
    return axios.post(url, data, config);
  }
  
  put(url, data, config) {
    return axios.put(url, data, config);
  }
  
  patch(url, data, config) {
    return axios.patch(url, data, config);
  }
  
  delete(url, config) {
    return axios.delete(url, config);
  }
}

export default new HttpService();
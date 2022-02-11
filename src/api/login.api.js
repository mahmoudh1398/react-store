import http from "services/http.service";
import { LOGIN } from "config/url.config";

export async function loginUser(data) {
  try {
    const response = await http.post(LOGIN, data);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}

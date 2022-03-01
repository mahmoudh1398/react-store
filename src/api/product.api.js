import http from "services/http.service";
import {PATHS} from 'config/routes.config';

export const getProduct = async (id) => {
	try {
		const response = await http.get(`${PATHS.PRODUCTS}?id=${id}`);
		return response.data;
	} catch (e) {
		return Promise.reject(e);
	}
};
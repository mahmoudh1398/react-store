import http from "services/http.service";

export const getCategories = async () => {
	try {
		const response = await http.get(`/category`);
		return response.data;
	} catch (e) {
		return Promise.reject(e);
	}
};
import http from "services/http.service";

export const PriceCount = async (id, data) => {
   try {
      const response = await http.patch(`/products/${id}`, data)
      return response;
   } catch (e) {
      return Promise.reject(e);
   }
};

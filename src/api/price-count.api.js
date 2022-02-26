import http from "services/http.service";

export const PriceCount = async (id, data) => {
   try {
      http.patch(`/products/${id}`, data).then(
         res=>{
            console.log(res);
         }
      )
   } catch (error) {
      console.log(error);
   }
};

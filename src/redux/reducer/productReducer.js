import { ActionTypes } from "redux/action/productAction";

const initialState = {
	product: [],
};

export const productReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_PRODUCT:
			return {...state, product:payload}
		default:
			return state;
	}
};
import { ActionTypes } from "redux/action/categoriesAction";

const initialState = {
	categories: [],
};

export const categoriesReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_CATEGORIES:
			return {...state,categories:payload}
		default:
			return state;
	}
};

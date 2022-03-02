const ActionTypes = {
	SET_PRODUCT: "SET_PRODUCT",
};

const setProduct = (data) => {
	return {
		type: ActionTypes.SET_PRODUCT,
		payload: data,
	};
};

export {ActionTypes, setProduct};
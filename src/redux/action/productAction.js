const ActionTypes = {
	SET_PRODUCT: "SET_PRODUCT",
};

const setProduct = (product) => {
	return {
		type: ActionTypes.SET_PRODUCT,
		payload: product,
	};
};

export {ActionTypes, setProduct};
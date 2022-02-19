const ActionTypes = {
	SET_CATEGORIES: "SET_CATEGORIES",
};

const setCategories = (categories) => {
	return {
		type: ActionTypes.SET_CATEGORIES,
		payload: categories,
	};
};

export {ActionTypes, setCategories};

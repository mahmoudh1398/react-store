const initialState = {
	basketStatusUpdate: false,
};

const basketStatusUpdateReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'RE_RENDER_STATUS':
			return {basketStatusUpdate: action.payload};
		default:
			return state;
	}
};

export {basketStatusUpdateReducer};
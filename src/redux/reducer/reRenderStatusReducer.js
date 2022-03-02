const initialState = {
	renderStatus: false,
};

const renderStatusReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'RE_RENDER_STATUS':
			return {renderStatus: action.payload};
		default:
			return state;
	}
};

export {renderStatusReducer};
export default (state = [], action) => {
	switch (action.type) {
		case 'FETCH_ITEMS':
			return action.payload;
		case 'ITEM_SELECTED':
			console.log(action);
			return state;
		default:
			return state;
	}
};
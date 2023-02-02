import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import usersReducer from './usersReducer';
import errorReducer from './errorReducer';



// will grab items from api for home page of store, for now its summy data
// const itemsReducer = () => {
// 	return [
// 		{ title: 'Gucci Wallet', quantity: 1 },
// 		{ title: 'Victoria Secret Thong', quantity: 10 },
// 		{ title: 'Bag', quantity: 3 },
// 		{ title: 'Sunglasses', quantity: 1 }
// 	];
// }


const selectedItemReducer = (selectedItem=null, action) => {
	// console.log('selectedItemReducer');
	if (action.type === 'ITEM_SELECTED') {
		return action.payload;
	}

	return selectedItem;
};


// export default combineReducers({
// 	items: itemsReducer,
// 	selectedItem: selectedItemReducer
// });


export default combineReducers({
	items: itemsReducer,
	user_object: usersReducer,
	errors: errorReducer
});
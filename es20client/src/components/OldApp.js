import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';

const PageOne = () => {
	return <div>PageOne</div>;
};

const PageTwo = () => {
	return <div>PageTwo</div>;
};

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<div className="ui container grid">
					<div className="ui row">
						<div className="column eight wide">
							<ItemList />
						</div>
						<div className="column eight wide">
							<ItemDetail />
						</div>
					</div>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;
import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import HomeScreen from './HomeScreen';
import ProductsHome from './ProductsHome';
import CareersHome from './CareersHome';
import ContactUsHome from './ContactUsHome';
import UserHome from './UserHome';
import Navbar from './Navbar/Navbar';
import './App.css';

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<Route path="/" exact component={HomeScreen} />
					<Route path="/productshome" component={ProductsHome} />
					<Route path="/careershome" component={CareersHome} />
					<Route path="/contactushome" component={ContactUsHome} />
					<Route path="/userhome" component={UserHome} />
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;
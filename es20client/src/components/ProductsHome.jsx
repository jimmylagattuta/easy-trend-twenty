import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// products will be fiilterable here, a more specific page than home
class ProductsHome extends Component{
	render() {
		console.log('ProductsHome jsx props', this.props);
		return (
			<div className="App">
				<h1>Products Headquarters</h1>
			</div>
		);
	}
}

export default ProductsHome;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// products will be fiilterable here, a more specific page than home
class ProductsHome extends Component{
	renderProducts() {
		if (this.props.products) {
			return this.props.products.map((p) => {
				return (
					<div>
						<p>{p.title}</p>
						<p>{p.category}</p>
						<p>{p.rate}</p>
						<p>{p.description}</p>
						<p>{p.price}</p>
						<p>{p.quantity}</p>
				        <img
				          src={p.image}
				          alt="Product"
				          height="200"
				      />
					</div>

				);
			});
		}
	}
	render() {
		console.log('ProductsHome jsx props', this.props);
		return (
			<div className="App">
				{this.renderProducts()}
			</div>
		);
	}
}

export default ProductsHome;
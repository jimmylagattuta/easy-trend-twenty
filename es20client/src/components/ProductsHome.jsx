import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import ProductsHelper from './ProductsHome';

// products will be fiilterable here, a more specific page than home
class ProductsHome extends Component{
	renderProducts() {
		if (this.props.products) {
			let count = 0;

			return this.props.products.map((p) => {
				count++;
				return (
					<Row >
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
					</Row>

				);
			});
		}
	}
	render() {
		console.log('ProductsHome jsx props', this.props);
		return (
			<div className="App">

				<ProductsHelper products={this.props.products} />
			</div>
		);
	}
}

export default ProductsHome;
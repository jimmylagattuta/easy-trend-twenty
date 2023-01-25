import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Row, Col, Container} from 'react-bootstrap';
import { Button } from "./Button";

import './ProductsHelper.css';
// products will be fiilterable here, a more specific page than home
class ProductsHelper extends Component{
	renderData(products) {
		if (products) {
			return products.map((p, id) => {
				return (
					<div className="product-item" key={id}>
						<p>{p.title}</p>
						<p>${p.price}</p>
				        <img
				          src={p.image}
				          alt="Product"
				          height="160"
					    />
						<p>{p.description.slice(0, 100)}</p>
						<p>Id){" "}{p.id}</p>
						<Button onClick={() => this.props.addToCart(p)} id="add-hover-settings" className="make-row">
							Add to Cart
						</Button>
					</div>
				);
			});





		}		
	}
	render() {
		console.log('ProductsHelper jsx props', this.props);
		return (
			<div className="products-list">
				{this.renderData(this.props.products)}
			</div>
		);		
	}
}

export default ProductsHelper;
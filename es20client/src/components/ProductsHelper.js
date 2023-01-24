import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Row, Col, Container} from 'react-bootstrap';
import './ProductsHelper.css';
// products will be fiilterable here, a more specific page than home
class ProductsHelper extends Component{
	renderData(products) {
		if (products) {
			return products.map((p, id) => {
				return (
					<div key={id}>
						<p>{p.title}</p>
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
		console.log('ProductsHelper jsx props', this.props);
		return (
			<div className="products-list">
				{this.renderData(this.props.products)}
			</div>
		);		
	}
}

export default ProductsHelper;
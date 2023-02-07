import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Row, Col, Container} from 'react-bootstrap';
import { Button } from "./Button";
import AddToCartHelper from './helpers/AddToCartHelper';

import './ProductsHelper.css';
// products will be fiilterable here, a more specific page than home
class ProductsHelper extends Component{
	state = { cartItemsNoUser: [] }
	renderAddToCartNoUser(p) {
		// console.log('renderAddToCartNoUser', p);
		const addCartBundle = {
			productId: p.product.id,
			quantity: 1,
			product: p.product
		};
		if (!this.props.loggedIn) {
			// guest
			console.log('guest');

			return (
				<Button onClick={() => {
					if (this.props.cartItemsNoUser.length > 0) {
					    let updatedList = this.props.cartItemsNoUser.map((item, index) => {
					    	if (item.productId === p.product.id) {
					    		// console.log('item.productId === p.id');
					    		// console.log('item.productId', item.productId);
					    		// console.log('p.id', p.id);
					    		// console.log('addCartBundle', addCartBundle);
					    		// console.log('index', index);
								this.props.addToCartNoUser(addCartBundle, index);
					    	} else {
					    		// console.log('item.productId !== p.id');
					    		// console.log('item.productId', item.productId);
					    		// console.log('p.id', p.id);
					    		// console.log('addCartBundle', addCartBundle);
					    		// // looks ok
					    		// console.log('index', index);
					    		this.props.addToCartNoUser(addCartBundle);
					    	}
					    });
					} else {
						this.props.addToCartNoUser(addCartBundle);
					}
				}}
				id="add-hover-settings" className="make-row">
					Add to Cart
				</Button>
			);
			// user
		} else {
			console.log('user');
			return <AddToCartHelper addToCart={this.props.addToCart} loggedIn={this.props.loggedIn} p={p}  />;
		}
	}
	renderData(products) {
		if (products) {
			return products.map((p, id) => {
				// console.log('p', p);
				// console.log('id', id);
				return (
					<div className="product-item" key={id}>
						<p id="product-title">{p.product.title.slice(0, 30)}</p>
						<p>${p.product.price}</p>
				        <img
				          src={p.product.image}
				          alt="Product"
				          height="130"
					    />
						<p id="product-description">{p.product.description.slice(0, 60)}</p>
						{this.renderAddToCartNoUser(p)}
					</div>
				);
			});





		}		
	}
	render() {
		console.log('ProductsHelper jsx props', this.props);
		// console.log('ProductsHelper jsx state', this.state);
		return (
			<div className="products-list">
				{this.renderData(this.props.products)}
			</div>
		);		
	}
}

export default ProductsHelper;
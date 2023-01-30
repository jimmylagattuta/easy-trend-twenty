import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Row, Col, Container} from 'react-bootstrap';
import { Button } from "./Button";
import AddToCartHelper from './helpers/AddToCartHelper';

import './ProductsHelper.css';
// products will be fiilterable here, a more specific page than home
class ProductsHelper extends Component{
	state = { cartItemsNoUser: [] }
	// no longer active
	// addToStateCart(p) {
	// 	this.setState({ cartItemsNoUser: [...this.state.cartItemsNoUser, p] });
	// }
	renderAddToCartNoUser(p) {
		// console.log('renderAddToCartNoUser', p);
		const addCartBundle = {
			productId: p.id,
			quantity: 1,
			product: p
		};
		if (!this.props.logged_in) {
			// guest
			return (
				<Button onClick={() => this.props.addToCartNoUser(addCartBundle)} id="add-hover-settings" className="make-row">
					Add to Cart
				</Button>
			);
			// user
		} else {
			<AddToCartHelper addToCart={this.props.addToCart} loggedIn={this.props.loggedIn} p={p}  />
		}
	}
	renderData(products) {
		if (products) {
			return products.map((p, id) => {
				return (
					<div className="product-item" key={id}>
						<p id="product-title">{p.title.slice(0, 30)}</p>
						<p>${p.price}</p>
				        <img
				          src={p.image}
				          alt="Product"
				          height="130"
					    />
						<p id="product-description">{p.description.slice(0, 60)}</p>
						{this.renderAddToCartNoUser(p)}
					</div>
				);
			});





		}		
	}
	render() {
		// console.log('ProductsHelper jsx props', this.props);
		// console.log('ProductsHelper jsx state', this.state);
		return (
			<div className="products-list">
				{this.renderData(this.props.products)}
			</div>
		);		
	}
}

export default ProductsHelper;
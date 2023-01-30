import React, { Component } from 'react';
import './CartComponent.css';

class CartComponent extends Component {
	// changed all className to class 1/2923 7:49PM
	render() {
		return (
			<div id="cart-div-component">
				<div className="dropdown">
				  <i className="fab fa-opencart"></i>
				  <p id="cart-length" className="p-cart-component">
					{this.props.cart_items.length}
				  </p>
				  <div className="dropdown-content">
				  <p>Hello</p>
				  </div>
				</div>
			</div>

		);
	}
}

export default CartComponent;
import React, { Component } from 'react';
import './CartComponent.css';

class CartComponent extends Component {
	render() {
		return (
			<div id="cart-div-component">
				<div class="dropdown">
				  <i class="fab fa-opencart"></i>
				  <p id="cart-length" className="p-cart-component">
					{this.props.cart_items.length}
				  </p>
				  <div class="dropdown-content">
				  <p>Hello</p>
				  </div>
				</div>
			</div>

		);
	}
}

export default CartComponent;
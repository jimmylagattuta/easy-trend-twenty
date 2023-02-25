import React, { Component } from 'react';
import { Button } from "../cssComponents/Button";

class AddToCartHelper extends Component {
	render() {
		// console.log('AddToCartHelper', this.props);
		if (this.props.loggedIn) {
			return (
				<Button onClick={() => this.props.addToCart(this.props.p.product)} id="add-hover-settings" className="make-row">
					Add to Cart
				</Button>
			);
		} else {
			return (
				<Button onClick={() => this.props.addToCart(this.props.p.product)} id="add-hover-settings" className="make-row">
					Add to Cart
				</Button>
			);
		}
	}
}

export default AddToCartHelper;
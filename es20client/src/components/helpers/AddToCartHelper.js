import React, { Component } from 'react';
import { Button } from "../Button";

class AddToCartHelper extends Component {
	render() {
		console.log('AddToCartHelper', this.props);
		if (this.props.loggedIn) {
			return (
				<Button onClick={() => this.props.addToCart(this.props.p)} id="add-hover-settings" className="make-row">
					Add to Cart
				</Button>
			);
		} else {
			return (
				<Button onClick={() => this.props.addToCart(this.props.p)} id="add-hover-settings" className="make-row">
					Add to Cart
				</Button>
			);
		}
	}
}

export default AddToCartHelper;
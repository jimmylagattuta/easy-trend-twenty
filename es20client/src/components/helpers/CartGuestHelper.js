import React, { Component } from 'react';
import './CartGuestHelper.css';
class CartGuestHelper extends Component {
	renderMinusSignCartItem(item) {
		// console.log('renderMinusSignCartItem');
		// console.log('item', item);
		if (item.quantity === 1) {
			return <p id="gc-red-delete-button-minus" className="gc-red-delete-button">Delete</p>;
		} else {
			return <p id="gc-button-minus" className="gc-mini-menu-select">-</p>;
		}

	}
	renderImageSize(image) {
		console.log('image.height', image.height);
		return (
	        <img
	          src={image}
	          alt="Product"
	          width="140"
		    />
		);
	}
	renderItems(items) {
		console.log('renderItems/CartGuestHelper props', this.props);
		return items.map((item, id) => {
			console.log("item ~> ", item);
			const product = item.product;
			return (
				<div className="gc-add-to-cart-mini-menu-cart-items" key={product.id}>
					<div className="gc-space-out-quantity-and-buttons">
						<div className="gc-cart-traits">
							{this.renderImageSize(product.image)}
						    <div className="cart-attributes">
								<h1 className="gc-mini-menu-title">{product.title}</h1>
								<p className="gc-mini-menu-title">Rating: {product.rate}</p>
								<p className="gc-mini-menu-title">{product.description}</p>
								<p className="gc-mini-menu-title">Category: {product.category}</p>
							</div>
						</div>
						<div className="gc-mini-nav-card">
							<div className="gc-row-container">



								<div className="gc-right-floated-content">
									<h2 className="gc-mini-menu-title">Price: ${product.price}</h2>
									<div
										onClick={() => {
											console.log('- Cart', item)
											this.props.changeCartItemGuest("-", item, id);
										}}
									>
										{this.renderMinusSignCartItem(item)}										
									</div>
									<div
										onClick={() => {
											console.log('+ Cart', item);
											this.props.changeCartItemGuest("+", item, id);
										}}
									>
										<p id="gc-button-plus" className="gc-mini-menu-select">+</p>
									</div>
									<p className="gc-mini-menu-title">Quantity: {item.quantity}</p>
								</div>





							</div>
						</div>
					</div>
				</div>
			);
		});
	}
	render() {
		console.log('CartGuestHelper props', this.props);
		return (
			<div className="guest-cart">
				{this.renderItems(this.props.cartItemsNoUser)}
			</div>
		);
	}
}

export default CartGuestHelper;
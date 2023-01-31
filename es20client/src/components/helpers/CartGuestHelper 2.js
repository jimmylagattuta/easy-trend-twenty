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
	renderItems(items) {
		console.log('renderItems/CartGuestHelper props', this.props);
		return items.map((item, id) => {
			console.log("item ~> ", item);
			const product = item.product;
			return (
				<div className="gc-add-to-cart-mini-menu-cart-items" key={product.id}>
					<div className="gc-space-out-quantity-and-buttons">
						<div className="gc-cart-traits">
					        <img
					          src={product.image}
					          alt="Product"
					          height="400"
						    />
						    <div className="cart-attributes">
								<h2 className="gc-mini-menu-title">{product.title}</h2>
								<h2 className="gc-mini-menu-title">Rating: {product.rate}</h2>
								<h2 className="gc-mini-menu-title">{product.description}</h2>
								<h2 className="gc-mini-menu-title">Category: {product.category}</h2>
							</div>
						</div>
						<div className="gc-mini-nav-card">
							<div className="gc-row-container">



								<div className="gc-right-floated-content">
									<h2 className="gc-mini-menu-title">Price: ${product.price}</h2>
									<button
										onClick={() => {
											console.log('- Cart', item)
											this.props.changeCartItemGuest("-", item, id);
										}}
									>
										{this.renderMinusSignCartItem(item)}										
									</button>
									<button
										onClick={() => {
											console.log('+ Cart', item);
											this.props.changeCartItemGuest("+", item, id);
										}}
									>
										<p id="gc-button-plus" className="gc-mini-menu-select">+</p>
									</button>
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
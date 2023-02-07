import React, { Component } from 'react';
import './MiniMenu.css';

class MiniMenu extends Component {

	renderMinusSignCartItem(item) {
		// console.log('renderMinusSignCartItem');
		// console.log('item', item);
		if (item.quantity === 1) {
			return <p id="red-delete-button-minus" className="red-delete-button">Delete</p>;
		} else {
			return <p id="button-minus" className="mini-menu-select">-</p>;
		}

	}
	renderItemsGuest(items) {
		console.log('renderItemsGuest/MiniMenu props', this.props);
		return items.map((item, id) => {
			// console.log("item Mini Menu~> ", item);
			const product = item.product;
			return (
				<div className="add-to-cart-mini-menu-cart-items" key={product.id}>
					<div className="space-out-quantity-and-buttons">
						<div className="cart-traits">
					        <img
					          src={product.image}
					          alt="Product"
					          height="60"
						    />
							<h2 className="mini-menu-title">{product.title.slice(0, 60)}{" "}.{" "}.{" "}.</h2>
						</div>
						<div className="mini-nav-card">
							<div className="row-container">
								<div className="right-floated-content">
									<button
										id="mini-nav-button-element"
										onClick={() => {
											// console.log('- Cart MiniMenu', item);
											// console.log('id', id);
											this.props.changeCartItemGuest("-", item, id);
										}}
									>
										{this.renderMinusSignCartItem(item)}										
									</button>
									<button
										id="mini-nav-button-element"

										onClick={() => {
											// console.log('+ Cart', item);
											this.props.changeCartItemGuest("+", item, id);
										}}
									>
										<p id="button-plus" className="mini-menu-select">+</p>
										<p className="mini-menu-title">Quantity: {item.quantity}</p>
									</button>
									
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		});
	}
	renderItemsUser(items) {
		console.log('renderItemsUser/MiniMenu props', this.props);
		console.log('renderItemsUser/MiniMenu items', items);
		return items.map((item, id) => {
			console.log("item Mini Menu~> ", item);
			const product = item.product;
			return (
				<div className="add-to-cart-mini-menu-cart-items" key={product.id}>
					<div className="space-out-quantity-and-buttons">
						<div className="cart-traits">
					        <img
					          src={product.image}
					          alt="Product"
					          height="60"
						    />
							<h2 className="mini-menu-title">{product.title.slice(0, 60)}{" "}.{" "}.{" "}.</h2>
						</div>
						<div className="mini-nav-card">
							<div className="row-container">
								<div className="right-floated-content">
									<button
										id="mini-nav-button-element"
										onClick={() => {
											// console.log('- Cart MiniMenu', item);
											// console.log('id', id);
											this.props.changeCartItemUser("-", item, id);
										}}
									>
										{this.renderMinusSignCartItem(item)}										
									</button>
									<button
										id="mini-nav-button-element"

										onClick={() => {
											// console.log('+ Cart', item);
											this.props.changeCartItemUser("+", item, id);
										}}
									>
										<p id="button-plus" className="mini-menu-select">+</p>
										<p className="mini-menu-title">Quantity: {item.quantity}</p>
									</button>
									
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		});
	}
	render() {
		console.log('MiniMenu has rendered', this.props);
		if (this.props.cartItemsNoUser.length > 0) {
			console.log('MiniMenu cartItemsNoUser!', this.props);
			return (
				<div>
					{this.renderItemsGuest(this.props.cartItemsNoUser)}
				</div>
			);
		} else if (this.props.cart_items.length > 0) {
			console.log('MiniMenu cart_items!', this.props);
			return (
				<div>
					{this.renderItemsUser(this.props.cart_items)}
				</div>
			);
		} else {		
			console.log('MiniMenu Empty cart_items and cartItemsNoUser', this.props);
			return (
				<div className="add-to-cart-mini-menu">
					<p className="mini-menu-title-menu">Add To Cart!</p>
					<div className="visible-mini-cart-menu"></div>
				</div>
			);
		}
	}
}

export default MiniMenu;
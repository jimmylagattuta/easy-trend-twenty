import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CartUserHelper.css';
class CartUserHelper extends Component {
	renderMinusSignCartItem(item) {
		console.log('renderMinusSignCartItem');
		// console.log('item', item);
		const cart_items = this.props.cart_items;
		if (cart_items.length == 1) {
			console.log('cart_items = 1');
			if (item.quantity == 1) {
				console.log('item = 1');
				return (
					<Link to="/homescreen">
						<p id="gc-red-delete-button-minus" className="gc-red-delete-button">
							Delete
						</p>
					</Link>
				);
			} else {
				console.log('item > 1');
				return <p id="gc-button-minus" className="gc-mini-menu-select">-</p>;
			}

		} else {
			console.log('cart_items > 1');
			if (item.quantity == 1) {
				console.log('item = 1');
				return <p id="gc-red-delete-button-minus" className="gc-red-delete-button">Delete</p>;
			} else {
				console.log('item > 1');
				return <p id="gc-button-minus" className="gc-mini-menu-select">-</p>;
			}
		}

	}
	renderImageSize(image, title) {
		// console.log('image.height', image.height);
		const getMeta = (url, cb) => {
		  const img = new Image();
		  img.onload = () => cb(null, img);
		  img.onerror = (err) => cb(err);
		  img.src = url;
		};
		let imageHeight = null;
		getMeta(image, (err, img) => {
		  // console.log(title);
		  // console.log(img.naturalWidth, img.naturalHeight);
		  imageHeight = img.naturalHeight;
		});
		// console.log('imageHeight', imageHeight);
		  if (imageHeight < 481) {
			return (
		        <img
		          src={image}
		          alt="Product"
		          width="240"
			    />
			);
		  } else {
		  	// doesn't run
			return (
		        <img
		          src={image}
		          alt="Product"
		          width="140"
			    />
			);
		  }
	}
	renderItems(items) {
		// console.log('renderItems/CartUserHelper props', this.props);
		return items.map((item, id) => {
			const product = item.product;
			return (
				<div className="gc-add-to-cart-mini-menu-cart-items" key={product.id}>
					<div className="gc-space-out-quantity-and-buttons">
						<div className="gc-cart-traits">
							{this.renderImageSize(product.image, product.title)}
						    <div className="cart-attributes">
								<h1 className="gc-mini-menu-title">{product.title}</h1>
								<p className="gc-mini-menu-title">Rating: {product.rate}</p>
								<p className="gc-mini-menu-title">{product.description}</p>
								<p className="gc-mini-menu-title">Category: {product.category}</p>
							</div>
						</div>
						<div className="gc-mini-nav-card">
							<div className="gc-row-container">



								<h2 className="gc-mini-menu-title">Price: ${product.price}</h2>
								<h2 className="gc-mini-menu-title">Tax: ${(product.price) * (item.quantity)}</h2>
								<div className="gc-right-floated-content">
									<div
										onClick={() => {
											// console.log('+ Cart', item);
											this.props.changeCartItemUser("+", item, id);
										}}
									>
										<p id="gc-button-plus">+</p>
									</div>
									<p id="quantity-cart-user-p">{item.quantity}</p>
									<div
										onClick={() => {
											// console.log('- Cart CartUserHelper', item);
											this.props.changeCartItemUser("-", item, id);
										}}
									>
										{this.renderMinusSignCartItem(item)}										
									</div>
								</div>
								<h2 className="gc-mini-menu-title">Total: ${((product.price*item.quantity)*0.3) + (product.price*item.quantity)}</h2>
							</div>
						</div>
					</div>
				</div>
			);
		});
	}
	renderStripeApi() {
		// console.log('Ready for Stripe API');
		return (
			<div>
				<h1>(...Will be Button for StripeAPI(debit/credit)...)</h1>
			</div>
		);
	}
	render() {
		console.log('CartUserHelper props', this.props);

		return (
			<div className="user-cart">
				{this.renderItems(this.props.cart_items)}
				{this.renderStripeApi()}
			</div>
		);
	}
}

export default CartUserHelper;
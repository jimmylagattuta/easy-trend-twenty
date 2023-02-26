import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CartGuestHelper.css';
class CartGuestHelper extends Component {
	renderMinusSignCartItem(item) {
		// console.log('renderMinusSignCartItem');
		// console.log('item', item);
		const cartItemsNoUser = this.props.cartItemsNoUser;
		if (cartItemsNoUser.length == 1) {
			// console.log('cartItemsNoUser = 1');
			if (item.quantity == 1) {
				// console.log('item = 1');
				return (
					<Link to="/homescreen">
						<p id="gc-red-delete-button-minus" className="gc-red-delete-button">
							Delete
						</p>
					</Link>
				);
			} else {
				// console.log('item > 1');
				return <p id="gc-button-minus" className="gc-mini-menu-select">-</p>;
			}

		} else {
			// console.log('cartItemsNoUser > 1');
			if (item.quantity == 1) {
				// console.log('item = 1');
				return <p id="gc-red-delete-button-minus" className="gc-red-delete-button">Delete</p>;
			} else {
				// console.log('item > 1');
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
		// console.log('renderItems/CartGuestHelper props', this.props);
		return items.map((item, id) => {
			const product = item.product;
			const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price * item.quantity);
		    console.log('');
			let taxToFormat = (product.price) * 0.3;
		    console.log('taxToFormat', taxToFormat);
			const formattedTax = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(taxToFormat * item.quantity);
			let totalToFormat = ((product.price*item.quantity)*0.3) + (product.price*item.quantity);
			const formattedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalToFormat);
		    console.log('');

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



								<h2 className="gc-mini-menu-title">Price: {formattedPrice}</h2>
								<h2 className="gc-mini-menu-title">Tax: {formattedTax}</h2>
								<div className="gc-right-floated-content">
									<div
										onClick={() => {
											// console.log('+ Cart', item);
											this.props.changeCartItemGuest("+", item, id);
										}}
									>
										<p id="gc-button-plus">+</p>
									</div>
									<p id="quantity-cart-guest-p">{item.quantity}</p>
									<div
										onClick={() => {
											// console.log('- Cart CartGuestHelper', item);
											this.props.changeCartItemGuest("-", item, id);
										}}
									>
										{this.renderMinusSignCartItem(item)}										
									</div>
								</div>
								<h2 className="gc-mini-menu-title">Total: {formattedTotal}</h2>
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
		// console.log('CartGuestHelper props', this.props);
		return (
			<div className="guest-cart">
				{this.renderItems(this.props.cartItemsNoUser)}
				{this.renderStripeApi()}
			</div>
		);
	}
}

export default CartGuestHelper;
import React, { Component } from 'react';
import './MiniMenu.css';

class MiniMenu extends Component {
	renderItems(items) {
		console.log('renderItems/MiniMenu props', this.props);
		return items.map((item) => {
			console.log("item ~> ", item);
			return (
				<div className="add-to-cart-mini-menu-cart-items" key={item.name}>
					<div className="space-out-quantity-and-buttons">
						<div className="cart-traits">
					        <img
					          src={item.image}
					          alt="Product"
					          height="60"
						    />
							<h2 className="mini-menu-title">{item.title.slice(0, 60)}</h2>
						</div>
						<div className="mini-nav-card">
							<div className="row-container">
								<div className="right-floated-content">
									<button
										id="mini-nav-button-element"
										onClick={() => console.log('- Cart', item)}
									>
										<p id="button-minus" className="mini-menu-select">-</p>
									</button>
									<button
										id="mini-nav-button-element"

										onClick={() => console.log('+ Cart', item)}
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
		if (this.props.cartItemsNoUser.length > 0) {
			return (
				<div>
					{this.renderItems(this.props.cartItemsNoUser)}
				</div>
			);
		} else {		
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
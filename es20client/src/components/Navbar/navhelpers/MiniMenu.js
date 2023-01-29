import React, { Component } from 'react';
import './MiniMenu.css';

class MiniMenu extends Component {
	renderItems(items) {
		console.log('renderItems/MiniMenu props', this.props);
		return items.map((item) => {
			console.log("item ~> ", item);
			return (
				<div className="add-to-cart-mini-menu-cart-items" key={item.name}>
					<div className="cart-traits">
						<h2 className="mini-menu-title">{item.title}</h2>
						<p className="mini-menu-title">Quantity: {item.quantity}</p>
					</div>
					<div className="mini-nav-card">
						<div className="right-floated-content">
							<button
								id="mini-nav-button-element"
								className="ui button primary"
								onClick={() => console.log('- Cart', item)}
							>
								<p className="mini-menu-select">-</p>
							</button>
							<button
								id="mini-nav-button-element"
								className="ui button primary"
								onClick={() => console.log('+ Cart', item)}
							>
								<p className="mini-menu-select">+</p>
							</button>
							
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
		}
	}
}

export default MiniMenu;
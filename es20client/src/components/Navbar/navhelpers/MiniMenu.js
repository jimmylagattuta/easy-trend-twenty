import React, { Component } from 'react';
import './MiniMenu.css';

class MiniMenu extends Component {
	renderItems(items) {
		console.log('renderItems/MiniMenu props', this.props);
		return items.map((item) => {
			console.log("item ~> ", item);
			return (
				<div className="item" key={item.name}>
					<div className="right floated content">
						<button
							className="ui button primary"
							onClick={() => console.log('Add to NavigationBridge cartItemsNoUser state', item)}
						>
							<p className="mini-menu-title">Select</p>
						</button>
					</div>
					<div className="description">
						<h2 className="mini-menu-title">{item.title}</h2>
						<p className="mini-menu-title">Quantity: {item.quantity}</p>
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
					<p className="mini-menu-title">Add To Cart!</p>
				</div>
			);
		}
	}
}

export default MiniMenu;
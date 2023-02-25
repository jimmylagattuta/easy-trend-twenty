import React from 'react';
import { connect } from 'react-redux';

const ItemDetail = ({ item }) => {
	if (!item) {
		return <div>Select an Item</div>
	}


	return (
		<div>
			<h3>Details for:</h3>
			<p>
				Title: {item.name}
				<br />
				Quantity: {item.quantity}
			</p>
		</div>
	);
};

const mapStateToProps = state => {
	return { item: state.selectedItem }
};

export default connect(mapStateToProps)(ItemDetail);
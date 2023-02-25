import React from 'react';
import { connect } from 'react-redux';
import { selectItem, fetchItems } from '../../actions';

class ItemList extends React.Component {
	componentDidMount() {
		// moving to higher component
		// this.props.fetchItems();
	}
	renderList() {
		// console.log('props', this.props);
		if (this.props.items.data) {
			return this.props.items.data.map((item) => {
				// console.log("item ~> ", item);
				return (
					<div className="item" key={item.name}>
						<div className="right floated content">
							<button
								className="ui button primary"
								onClick={() => this.props.selectItem(item)}
							>
								Select
							</button>
						</div>
						<div className="description">
							<h2>{item.name}</h2>
							<p>Stock: {item.quantity}</p>
						</div>
					</div>
				);
			});
		} else {
			return <div></div>;
		}
	}

	render() {
		// console.log('ItemList props', this.props);
		return <div className="ui relaxed divided list">{this.renderList()}</div>;
	}
}

const mapStateToProps = (state) => {
	// console.log('state ~>', state);
	return { items: state.items };
}

export default connect(
	mapStateToProps,
	{ selectItem, fetchItems }
)(ItemList);
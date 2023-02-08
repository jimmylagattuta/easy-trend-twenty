import React, { Component } from 'react';
import './RatingFilter.css';

class RatingFilter extends Component {
	render() {
		console.log('RatingFilter Component props', this.props);
		return (
			<p className="filter-title">Rating(Best)</p>
		);
	}
}

export default RatingFilter;
import React, { Component } from 'react';
import './CategoryFilter.css';

class CategoryFilter extends Component {
	render() {
		console.log('CategoryFilter Component props', this.props);
		return (
			<p className="filter-title">Category</p>
		);
	}
}

export default CategoryFilter;
import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

import './CheapestFilter.css';

class CheapestFilter extends Component {
    onSubmit(values) {
    	// console.log('values', values);
    	this.props.arrangeFilteredProducts("cheapest");
    }
	render() {
		// console.log('CheapestFilter Component props', this.props);
	    const handleChange = (event) => {
	    	// console.log('this.props KeywordFilter', this.props);
	        this.onSubmit(event.target.value);
	    };
		return (
	        <div className="cheapest-div">
	        	<label className="filter-title">Cheapest</label>
				<input onChange={handleChange} type="checkbox" name="keyword" component="input" placeholder="Keyword" />
        	</div>
		);
	}
}

export default CheapestFilter;
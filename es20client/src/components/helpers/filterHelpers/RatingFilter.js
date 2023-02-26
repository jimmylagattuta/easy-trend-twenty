import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

import './RatingFilter.css';

class RatingFilter extends Component {
    onSubmit(values) {
      // console.log('values', values);
      this.props.arrangeFilteredProducts("rating", this.props.filteredProducts);
    }
  render() {
    // console.log('RatingFilter Component props', this.props);
      const handleChange = (event) => {
        // console.log('this.props KeywordFilter', this.props);
          this.onSubmit(event.target.value);
      };
    return (
          <div className="rating-div">
            <label className="filter-title">Top Rated</label>
            <input onChange={handleChange} type="checkbox" name="keyword" component="input" placeholder="Rating" />
          </div>
    );
  }
}

export default RatingFilter;
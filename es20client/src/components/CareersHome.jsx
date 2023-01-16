import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CareersHome extends Component{
	render() {
		console.log('CareersHome props', this.props);
		return (
			<div className="App">
				<h1>Careers Headquarters</h1>
			</div>
		);
	}
}

export default CareersHome;
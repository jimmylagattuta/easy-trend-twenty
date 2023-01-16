import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ContactUsHome extends Component{
	render() {
		console.log('ContactUsHome jsx props', this.props);
		return (
			<div className="App">
				<h1>Contact Us Headquarters</h1>
			</div>
		);
	}
}

export default ContactUsHome;
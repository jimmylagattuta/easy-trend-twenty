import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import { fetchCookie } from '../actions';

class HomeScreen extends Component {
	// componentDidMount() {
    // 	this.props.fetchCookie();
    // 	console.log('this.getCSRFToken()', this.getCSRFToken());
  	// }
  	// getCSRFToken() {
    // 	return unescape(document.cookie.split('=')[1]);
	// }
	renderUser() {
		return (
			<div className="App">
				Welcome User: {this.props.user_in_app_state.user.first_name} with Email: {this.props.user_in_app_state.user.email}
			</div>
		);
	}
	render() {
		console.log('this.props HomeScreen', this.props);
		console.log('this.state HomeScreen', this.state);
		console.log('tthis.props.user_in_app_state', this.props.user_in_app_state);

		if (this.props.user_in_app_state) {
			console.log('render user');
			return(
			<div className="App">
				{this.renderUser()}
			</div>
			);
		}
		return (
			<div className="App">
				<h1>Home Headquarters</h1>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { user_object } = state.user_object;
	return { user_object };
}

export default connect(mapStateToProps, { fetchCookie })(HomeScreen);
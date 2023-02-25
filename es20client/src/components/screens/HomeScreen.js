import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ItemList from '../homeScreenHelpers/ItemList';
import ItemDetail from '../homeScreenHelpers/ItemDetail';
import ProductsHelper from './../helpers/ProductsHelper';
import { fetchCookie } from '../../actions';
import {Row, Col, Container} from 'react-bootstrap';



class HomeScreen extends Component {
	renderProducts() {
		// console.log('renderProducts', this.props);
		if (this.props.products) {
			return (
				<Container>
					<Row xs={1} md={3}>
						{this.props.products.map((p, id) => (

							<Col align="center" key={id}>
								<h1>{p.id}</h1>
							</Col>
							

						))}
					</Row>
				</Container>
			);



		}
	}
	renderUserMessage() {
		// console.log('renderUserMessage props', this.props);
		return (
			<div className="App">
				Welcome User: {this.props.user_in_app_state.user.first_name} with Email: {this.props.user_in_app_state.user.email}
			</div>
		);
	}
	render() {
		console.log('HomeScreen with ProductsHelper', this.props);
		// console.log('this.state HomeScreen', this.state);
		// console.log('this.props.user_in_app_state', this.props.user_in_app_state);

		return (
			<div className="App">
				<h1>Home Headquarters</h1>
				<ProductsHelper
					products={this.props.products}
					addToCart={this.props.addToCart.bind(this)}
					loggedIn={false}
					filteredProducts={this.props.filteredProducts}
					sortFilteredProducts={this.props.sortFilteredProducts}
					addToCartNoUser={this.props.addToCartNoUser}
					cartItemsNoUser={this.props.cartItemsNoUser}
					searchTerm={this.props.searchTerm}
					arrangeFilteredProducts={this.props.arrangeFilteredProducts}
					category={this.props.category}
					categorizeFilteredProducts={this.props.categorizeFilteredProducts}
				/>

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { user_object } = state.user_object;
	return { user_object };
}

export default connect(mapStateToProps, { fetchCookie })(HomeScreen);
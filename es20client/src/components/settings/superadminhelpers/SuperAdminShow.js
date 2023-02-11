import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row, Col, Container} from 'react-bootstrap';



class SuperAdminShow extends Component {
	renderProducts() {
		// console.log('renderProducts', this.props);
		// if (this.props.products) {
		// 	return (
		// 		<Container>
		// 			<Row xs={1} md={3}>
		// 				{this.props.products.map((p, id) => (

		// 					<Col align="center" key={id}>
		// 						<h1>{p.id}</h1>
		// 					</Col>
							

		// 				))}
		// 			</Row>
		// 		</Container>
		// 	);



		// }
	}

	render() {
		console.log('SuperAdminShow props, ', this.props);

		return (
			<div>
				SuperAdminShow
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { user_object } = state.user_object;
	return { user_object };
}

export default connect(mapStateToProps)(SuperAdminShow);
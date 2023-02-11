import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {Row, Col, Container} from 'react-bootstrap';
import './SuperAdminDropdown.css';

class SuperAdminDropdown extends Component {
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
		console.log('SuperAdminDropdown props, ', this.props);
	    const hierarchy = ["Admin", "Employee", "Consumer"];

	    const defaultOption = this.props.hierarchy;
	    const handleChangeCategory = (event) => {
	    	// console.log('handleChangeCategory', event.value);
	        this.props.chooseHierarchy(event.value, this.props.hierarchies);
	    };
		return (
			<div className="category-div">
			    <form>
			      <div className="category-dropdown-div">
				      <h1>Select Hierarchy List:{" "}</h1>
					  <div className="dropdown-div-hierarchy"><Dropdown options={this.props.hierarchies} onChange={handleChangeCategory} value={defaultOption} placeholder="Hierarchy" /></div>
				  </div>
			    </form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { user_object } = state.user_object;
	return { user_object };
}

export default connect(mapStateToProps)(SuperAdminDropdown);
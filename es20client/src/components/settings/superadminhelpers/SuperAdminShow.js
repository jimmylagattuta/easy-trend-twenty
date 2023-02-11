import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spreadsheet from "react-spreadsheet";
import './SuperAdminShow.css';

class SuperAdminShow extends Component {
  constructor(props){  
      super(props);  
      this.state = {  
           userNew: null
        }  

  }

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
	organizeUpdateUser() {
		const user = this.state.userNew;
		const userObject = {
			firstName: user[0][1].value,
			lastName: user[1][1].value,
			email: user[2][1].value,
			id: user[3][1].value,
			consumer: user[4][1].value,
			employee: user[5][1].value,
			admin: user[6][1].value,
			superAdmin: user[7][1].value
		}
		this.props.updateUser(userObject);
	}
	renderUpdateButton() {
		if (this.state.userNew) {
			return (
				<button className="button-go-back" onClick={() => this.organizeUpdateUser()}>
		  			Update User
		  		</button>
			);
		}
	}
	render() {
		console.log('SuperAdminShow props, ', this.props);
		const user = this.props.user[0];
	  	const data = [
	    	[{ value: "First Name:" }, { value: user.first_name }],
	    	[{ value: "Last Name:" }, { value: user.last_name }],
	    	[{ value: "Email:" }, { value: user.email }],
	    	[{ value: "ID:" }, { value: user.id }],
	    	[{ value: "Consumer:" }, { value: user.consumer }],
	    	[{ value: "Employee:" }, { value: user.employee }],
	    	[{ value: "Admin:" }, { value: user.admin }],
	    	[{ value: "Super Admin:" }, { value: user.super_admin }],

	  	];
	    const setData = (event) => {
	    	console.log('setData', event);
		  	data = [
		    	[{ value: "First Name:" }, { value: this.state.userNew[0][1].value.first_name }],
		    	[{ value: "Last Name:" }, { value: this.state.userNew[1][1].value.last_name }],
		    	[{ value: "Email:" }, { value: this.state.userNew[2][1].value.email }],
		    	[{ value: "ID:" }, { value: this.state.userNew[3][1].value.id }],
		    	[{ value: "Consumer:" }, { value: this.state.userNew[4][1].value.consumer }],
		    	[{ value: "Employee:" }, { value: this.state.userNew[5][1].value.employee }],
		    	[{ value: "Admin:" }, { value: this.state.userNew[6][1].value.admin }],
		    	[{ value: "Super Admin:" }, { value: this.state.userNew[7][1].value.super_admin }],

		  	];
	    	this.setState({ userNew: data });
	    };
	  	return (
	  		<div>
		  		<div id="make-column" className="center-self">
			  		Edit{" "}{this.props.user[0].first_name}{" "}{this.props.user[0].last_name}
			  		<Spreadsheet data={data} onChange={setData} />
			  		<div className="go-back-user">
				  		<button className="button-go-back" onClick={() => this.props.goBack('user')}>
				  			Go Back
				  		</button>
				  		{this.renderUpdateButton()}
					</div>
		  		</div>
	  		</div>
	  	);

	}
}

const mapStateToProps = (state) => {
	const { user_object } = state.user_object;
	return { user_object };
}

export default connect(mapStateToProps)(SuperAdminShow);
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
				<button className="button-go-back" onClick={() => {
					this.props.updateUser(this.state.userNew);
					this.setState({ userNew: null });
				}}>
		  			Update User
		  		</button>
			);
		}
	}
	renderError() {
		// console.log('this.props', this.props);
		if (this.props.error !== "") {
			return (
				<p id="red">{this.props.error}</p>
			);
		}
	}
	render() {
		// console.log('SuperAdminShow props, ', this.props);
		// console.log('SuperAdminShow state, ', this.state);
		let data = null;
		if (this.state.userNew) {
			const user = this.state.userNew[0];
		  	data = [
		    	[{ value: "First Name:" }, { value: user["First Name:"] }],
		    	[{ value: "Last Name:" }, { value: user["Last Name:"] }],
		    	[{ value: "Email:" }, { value: user["Email:"] }],
		    	[{ value: "Consumer:" }, { value: user["Consumer:"] }],
		    	[{ value: "Employee:" }, { value: user["Employee:"] }],
		    	[{ value: "Admin:" }, { value: user["Admin:"] }],
		    	[{ value: "Super Admin:" }, { value: user["Super Admin:"] }],

		  	];
		} else {
			const user = this.props.user[0];
		  	data = [
		    	[{ value: "First Name:" }, { value: user.first_name }],
		    	[{ value: "Last Name:" }, { value: user.last_name }],
		    	[{ value: "Email:" }, { value: user.email }],
		    	[{ value: "Consumer:" }, { value: user.consumer }],
		    	[{ value: "Employee:" }, { value: user.employee }],
		    	[{ value: "Admin:" }, { value: user.admin }],
		    	[{ value: "Super Admin:" }, { value: user.super_admin }],

		  	];			
		}
	    let setData = (event) => {
	    	// console.log('setData', event);
	    	const eFirstName = event[0][1].value;
	    	const eLastName = event[1][1].value;
	    	const eEmail = event[2][1].value;
	    	const eID = this.props.user[0].id;
	    	const eConsumer = event[3][1].value;
	    	const eEmployee = event[4][1].value;
	    	const eAdmin = event[5][1].value;
	    	const eSuperAdmin = event[6][1].value;


		  	data = [
		    	{ 
		    		"First Name:": eFirstName,
		    	  	"Last Name:": eLastName,
		    	  	"Email:": eEmail,
		    	  	"ID:": eID,
		    	  	"Consumer:": eConsumer,
		    	  	"Employee:": eEmployee,
		    	  	"Admin:": eAdmin,
		    	  	"Super Admin:": eSuperAdmin
		    	}

		  	];
	    	this.setState({ userNew: data });
	    };
	  	return (
	  		<div>
		  		<div id="make-column" className="center-self">
			  		Edit{" "}{this.props.user[0].first_name}{" "}{this.props.user[0].last_name}{" "}Id:{" "}{this.props.user[0].id}
			  		{this.renderError()}
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
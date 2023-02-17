import React, { Component } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

class ForgotPassword extends Component {
	constructor(props){  
	    super(props);  
	    this.state = {  
	         error: ""
	      }  
	}
	onSubmitSendEmail(values) {
		// console.log('onSubmit SignInUser!', values);
		// console.log('onSubmit SignInUser!', values);
		fetch("api/v1/forgot_password", {
	      method: "POST",
	      credentials: 'same-origin',
	      headers: {
	        "Content-Type": "application/json",
	      },
	      body: JSON.stringify(values),
	    }).then((res) => {
    	  // console.log('response', res);
	      if (res.ok) {
	        res.json().then((response) => {
	        	console.log('response forgot password', response);
	        });
	      } else {
	        res.json().then((errors) => {
	          console.error('error forgot password', errors);
	        });
	      }
	    })
	    .then(() => {
	    	// this.setState({ redirect: false });
	    });
		// removing redux to configure then will branch to add back redux
		// this.props.loginUser(values);
	}
	render() {
		return (
			<div>
				<Form
				    onSubmit={this.onSubmitSendEmail.bind(this)}
				    render={({ handleSubmit }) => (
				      <form onSubmit={handleSubmit}>
				        <h1>Forgot Password</h1>
					      	<p id="red">{this.state.error}</p>
				        <div>
				          	<Field name="email_or_username" component="input" placeholder="Email" />
				        </div>
				        <div className="sign-in-and-forgot-password">
					        <button type="submit" name="sign-in-button">
					        	Submit
					        </button>
				    	</div>
				      </form>
				    )}
				  />
			</div>
		);
	}
}

export default ForgotPassword;
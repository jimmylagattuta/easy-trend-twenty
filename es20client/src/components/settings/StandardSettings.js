import React, { Component } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { signUpUser, signInUser, addUser, loginUser } from '../../actions';
import { connect } from 'react-redux';
import './StandardSettings.css';

// function SendHomeScreen() {
//   const navigate = Redirect();

//   useEffect(() => {
//     if (this.props.user_in_app_state) {
//       navigate("/homescreen");
//     }
//   }, []);
// }

class StandardSettings extends Component{
	constructor(props){  
	    super(props);  
	    this.state = {  
	         data: 'www.javatpoint.com',
	         user_email: '',
	         redirect: false,
	         redirectChangePassword: false,
	         errorPassword: null
	      }  
	    this.handleEvent = this.handleEvent.bind(this);  
	}

	handleEvent(){  
	    // console.log('props! will convert to actions and reducers after signup login logout and is_logged_in?', this.props);  
	}
	onSubmitChangePassword(values) {
		// console.log('onSubmitChangePassword sign up!', values);
		const passwordOne = values.new_password;
		const passwordTwo = values.new_password_confirmation;
		if (passwordOne !== passwordTwo) {
			// console.log('passwordOne !== passwordTwo')
			this.setState({ errorPassword: "Password Mismatch" });
		} else {
			this.setState({ errorPassword: null });
			fetch("api/v1/change_password", {
		      method: "POST",
		      credentials: 'same-origin',
		      headers: {
		        "Content-Type": "application/json",
		      },
		      body: JSON.stringify(values),
		    }).then((res) => {
		      if (res.ok) {
		        res.json().then((user) => {
		        	// console.log('response api/v1/change_password', user);
	    			const resetUserInAppState = {
						logged_in: false,
						user: null
					};
	  				this.props.redirectChangePassword();
	  				this.props.setUserObject(this.props.user_in_app_state, "homescreen", [], user.message);
		        });
		      } else {
		        res.json().then((errors) => {
		          // console.error('error change_password!', errors);
		        });
		      }


		    });

		}

	}
	onSubmitChangeUser(values) {
		console.log('onSubmitChangeUser values', values);
	}
	render() {
		// console.log('StandardSettings props state', this.props, this.state);
		return (
			<div className="App">
				<Form
				    onSubmit={this.onSubmitChangePassword.bind(this)}
				    render={({ handleSubmit }) => (
				      <form onSubmit={handleSubmit}>
				        <h1>Change Password</h1>
				
				        <div>
				        	<label>Password</label>
				          	<Field name="password" component="input" type="password" placeholder="Password" />
				        </div>
				        <div>
				        	<label>New Password</label>
				          	<Field name="new_password" component="input" type="password" placeholder="New Password" />
				        </div>
				        <div>
					        <p id="red">{this.state.errorPassword}</p>
				        	<label>New Password Confirmation</label>
				          	<Field name="new_password_confirmation" component="input" type="password" placeholder="New Password Confirmation" />
				        </div>
				        <button type="submit">Submit</button>
				      </form>
				    )}
				  />
				<Form
				    onSubmit={this.onSubmitChangeUser.bind(this)}
				    render={({ handleSubmit }) => (
				      <form onSubmit={handleSubmit}>
				        <h1>Change User</h1>
				        <div>
				        	<label>Email</label>
				          	<Field name="email" component="input" placeholder="User's Email" />
				        </div>
				        <button type="submit">Submit</button>
				      </form>
				    )}
				  />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { user_object, cookie } = state.user_object;
	return { user_object, cookie };
}

export default connect(mapStateToProps, { signUpUser, signInUser, addUser, loginUser })(StandardSettings);
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { signUp, signIn } from '../actions';
import { Field, reduxForm } from 'redux-form';
import './signinsignup.css';
import axios from 'axios';

export const { SIGN_OUT } = 'sign_out';

class SignInImport extends Component {
	constructor(props) {
		super(props);

		this.state = {  signIn: false,
						signUp: false,
						userLive: false,
						users_name: "",
						id: 0
					}

		this.onClickSignChange = this.onClickSignChange.bind(this);
		this.onClickSignUpChange = this.onClickSignUpChange.bind(this);
		this.onUserLive = this.onUserLive.bind(this);
		this.logOut = this.logOut.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.userName = this.userName.bind(this);
	}

	componentWillMount() {
   		const userId = sessionStorage.getItem('userId');
   		const username = [];
	    if(userId > 0) {
	       	this.setState({ userLive: true });
	    }
   		const user = [];
   		if(userId > 0) {
   			this.setState({ id: userId });
	   		axios.post('http://localhost:3000/api/v1/port/port_check', { "id": userId })
	   			.then(response => {
	   				// port_active.push(response.data[0]['active']);
	   				let user = response.data['user'];
	   				// console.log('user ', user);
	   				username.push(user);
	   				// console.log('username here', username);
	   				this.userName(username);

	   			})
	   			.catch(err => {alert(err)});
	   	}
	   	// console.log('username here', username);
	   	
	}

	userName(user) {
		// console.log('userName');
		// console.log('user', user);
		let letter = user[0];
		if(letter.includes('.')) {
			// console.log('CONDITIONAL');
			let splitter = letter.split('.');
			// console.log('splitter', splitter);
			// console.log('to come back to');
		}
		// console.log('letter', letter);
		let first_letter = letter.slice(0, 1);
		// console.log('first_letter', first_letter);
		let cap_letter = first_letter.toUpperCase();
		// let new_name = 
		// console.log('cap_letter', cap_letter);
		let lower_case = letter.slice(1);
		// console.log('lower_case', lower_case);
		const brand_new_name = cap_letter + lower_case;
		// console.log('brand_new_name', brand_new_name);
		// console.log('this.state.users_name', this.state.users_name);
		this.setState({ users_name: brand_new_name });
		// console.log('this.state.users_name', this.state.users_name);

	}

	onClickSignChange() {
			this.setState({ signIn: false });
			this.setState({ signUp: false });
			this.setState({ userLive: false });


	}

	onClickSignUpChange() {
		if(this.state.signUp === false) {
			this.setState({ signUp: true });
		} else if(this.state.signUp === true) {
			this.setState({ signUp: false });
		}
	}
	onUserLive() {
		if(this.state.userLive === false) {
			this.setState({ userLive: true });
		} else if(this.state.userLive === true) {
			this.setState({ userLive: false });
		}
	}
    renderTextField(field) {
	    const { meta: {touched, error} } = field
	    const className = `form-group ${ touched && error ? 'has-danger' : '' }`;
	    return (
	      <div className={className} id="field-form">
	        <label>{field.label}</label>
	        <input
	          className="form-control"
	          type="text"
	          {...field.input}
	          placeholder={field.label}
	        />
	        <div className="text-help">
	          {touched ? error : ''}
	        </div>
	      </div>
	    );
    }
    renderPasswordField(field) {
	    const { meta: {touched, error} } = field
	    const className = `form-group ${ touched && error ? 'has-danger' : '' }`;
	    return (
	      <div className={className} id="field-form">
	        <label>{field.label}</label>
	        <input
	          className="form-control"
	          type="password"
	          {...field.input}
	          placeholder={field.label}
	        />
	        <div className="text-help">
	          {touched ? error : ''}
	        </div>
	      </div>
	    );
    }
    validSignin() {
    	if(this.userId > 0) {
    		this.setState({ userLive: true });
    	}
    	this.forceUpdate();
    }
    onSubmit(values) {
    	const email = document.getElementById('email').value;
    	const password = document.getElementById('password').value;
    	const new_email = [];
    	let username_save = [];
    	axios.post('http://localhost:3000/api/v1/sessions', { email, password })
    		.then(response => {
		        sessionStorage.setItem('confirmed', response.data.confirmed_at);
		    	sessionStorage.setItem('userId', response.data.id);
		    	sessionStorage.setItem('budget', response.data.budget);
		    	// IMPLEMENT!!!
		    	// sessionStorage.setItem('email', response.data.email);
        		new_email.push(response.data.email)
        		username_save.push(new_email);
        		window.location = "http://localhost:3001";
       			// this.setStateFuncEmail(email);
       		})
   			.catch(err => {alert(err)});
    }
    onSubmitSignup(values) {
   		axios.post('http://localhost:3000/api/v1/users', values)
   			.then(payload => {
   				alert('user created, you can now sign up using you username');
   				window.location = "http://localhost:3001";
   			})
   			.catch(err => {alert(err)});
   			this.onClickSignUpChange()
    }
    logOut() {
    	this.setState({ userLive: false });
		axios.post('http://localhost:3000/api/v1/user_logout')
			.then(response => {
		    	sessionStorage.setItem('userId', response.data.id);
   				window.location = "http://localhost:3001";
			})
   			.catch(err => {alert(err)});
   			this.forceUpdate();
    }
	render() {
		console.log('SignInImport props state', this.props, this.state);
	    const { handleSubmit } = this.props;
	    // console.log('this.state.users_name in render', this.state.users_name);
		if(this.state.userLive === false && this.state.signIn === false && this.state.signUp === false) {
			return (
				<div className="signinsignup_top_left">
					<div className="signinsignup_top_left_content">
						<div id="signing_in">
							<div id="sign_in_dashes">-Sign In-</div>
		    				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
		       	    			<div className="cred">
		         					<p>Email:</p> <input type="text" id="email"/>
				    			</div>
			        			<div className="cred">
		       						<p>Password:</p> <input type="password" id="password" />
			        				<button className="btn btn-success" type="submit">Submit</button>
		       					</div>
							</form>
							<div id="sign_up_main" onClick={this.onClickSignUpChange.bind(this)}>
								<p>Sign Up!</p>
							</div>
						</div>
					</div>
				</div>
			);
		}
		else if(this.state.userLive === false && this.state.signIn === true && this.state.signUp === false) {
			return (
				<div className="signinsignup_top_left">
					<div className="signinsignup_top_left_content">
						<div onClick={this.onClickSignChange.bind(this)}>
							<div>Sign In!(click me)</div>
						</div>
	    				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
	       	    			<div className="cred">
	         					<p>Email</p>
	         					<input type="text" id="email"/>
			    			</div>
		        			<div className="cred">
	 	            			<p>Password</p>
	       						<input type="password" id="password" />
	       					</div>
		        			<button className="btn btn-success" type="submit">Submit</button>
						</form>
					</div>
				</div>
			);
		} else if(this.state.userLive === false && this.state.signIn === false && this.state.signUp === true) {
			return (
				<div className="signinsignup_top_left">
					<div className="signinsignup_top_left_content">
						<div onClick={this.onClickSignUpChange.bind(this)}>
							<div id="sign_in_dashes">-Sign Up-</div>
						</div>
						<div id="signing_up">
							<form onSubmit={handleSubmit(this.onSubmitSignup.bind(this))}>
								<Field
									label="Email "
									name="email"
									component={this.renderTextField}
								/>
								<Field 
									label="Password "
									name="password"
									component={this.renderPasswordField}
								/>
								<Field
									label="Password Confirmation "
									name="password_confirmation"
									component={this.renderPasswordField}
								/>
								<button className="btn btn-success" type="submit">Submit</button>
							</form>
							<div id="sign_up_main" onClick={this.onClickSignChange.bind(this)}>
								<p>Sign In!</p>
							</div>
						</div>
					</div>
				</div>
			);
		} else if(this.state.userLive === true && this.state.signIn === false && this.state.signUp === false ) {
			return (
				<div className="signinsignup_top_left">
					<div className="signinsignup_top_left_content">
						<h2>Welcome {this.state.users_name}!</h2>
						<form id="go_to_user_page" action="http://localhost:3001/user">
    						<input type="submit" value="User Page" />
						</form>
						<div onClick={this.logOut.bind(this)}>
							<h3>Sign Out</h3>
						</div>
					</div>
				</div>
			);
		};
	};
};
function validate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = 'Enter a Username';
  }
  if (!values.password) {
    errors.password = "Enter a Password";
  }
  if (values.password_confirmation !== values.password) {
  	errors.password_confirmation = "Your Passwords Dont Match";
  }
  if (!values.email) {
  	errors.email = "Enter your Email"
  }
  return errors;
}
export default reduxForm({
	validate,
	form: 'signUp',
	form: 'signIn'
})(
 connect(null)(SignInImport)
);
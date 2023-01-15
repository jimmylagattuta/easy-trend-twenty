import React, { Component } from 'react';
import { Link, useNavigation } from 'react-router-dom';
import { Form, Field } from 'react-final-form'
import { signUpUser, signInUser, addUser, loginUser } from '../actions';
import { connect } from 'react-redux';
import './UserHome.css';

class UserHome extends Component{
	constructor(props){  
	    super(props);  
	    this.state = {  
	         data: 'www.javatpoint.com'
	      }  
	    this.handleEvent = this.handleEvent.bind(this);  
	}
	componentWillMount() {
		console.log('UserHome componentWillMount this.props', this.props);
		console.log('UserHome componentWillMount this.state', this.state);
		if (this.props.user_object != null) {
			console.log('user found', this.state);
			this.props.history.goBack();
		}
	}
	handleEvent(){  
	    console.log('props! will convert to actions and reducers after signup login logout and is_logged_in?', this.props);  
	}  
	onSubmit(values) {
		console.log('onSubmit SignUpUser!', values);
		fetch("api/v1/signup", {
	      method: "POST",
	      credentials: 'same-origin',
	      headers: {
	        "Content-Type": "application/json",
	      },
	      body: JSON.stringify(values),
	    }).then((res) => {
    	  console.log('response', res);
	      if (res.ok) {
	        res.json().then((user) => {
	        	console.log('setCurrentUser(user)');
	        	console.log('user', user);
	        	this.props.setUserObject(user);
	          // reimplement
	          // setCurrentUser(user);
	        });
	      } else {
	        res.json().then((errors) => {
	          console.error('errors onSubmit SignUpUser!', errors);
	        });
	      }
	    });
		// bringing into component to design in uniform, will branch to refactor later
		// this.props.addUser(values, this.props.cookie);

	}
	onSubmitSignIn(values) {
		console.log('onSubmit SignInUser!', values);
		this.props.loginUser(values);
	}
	render() {
		// old code that worked
		// if (this.props.user_object != null) {
		// 	console.log('user found', this.props);
		// 	this.props.history.goBack();
		// }




		console.log('this.props UserHome render', this.props);
		console.log('this.state UserHome render', this.state);
		return (
			<div className="App">
				<Form
				    onSubmit={this.onSubmit.bind(this)}
				    render={({ handleSubmit }) => (
				      <form onSubmit={handleSubmit}>
				        <h1>Sign Up!</h1>
				        <div>
				          <label>First Name</label>
				          <Field name="first_name" component="input" placeholder="First Name" />
				        </div>
				        <div>
				        	<label>Last Name</label>
				          	<Field name="last_name" component="input" placeholder="Last Name" />
				        </div>
				        <div>
				        	<label>Email</label>
				          	<Field name="email" component="input" placeholder="Email" />
				        </div>
				        <div>
				        	<label>Password</label>
				          	<Field name="password" component="input" type="password" placeholder="Password" />
				        </div>
				        <div>
				        	<label>Password Confirmation</label>
				          	<Field name="password_confirmation" component="input" type="password" placeholder="Password Confirmation" />
				        </div>
				        <button type="submit">Submit</button>
				      </form>
				    )}
				  />
				<Form
				    onSubmit={this.onSubmitSignIn.bind(this)}
				    render={({ handleSubmit }) => (
				      <form onSubmit={handleSubmit}>
				        <h1>Sign In!</h1>
				      
				        <div>
				        	<label>Email or Username(case sensative)</label>
				          	<Field name="email_or_username" component="input" placeholder="Email or Username" />
				        </div>
				        <div>
				        	<label>Password</label>
				          	<Field name="password" component="input" type="password" placeholder="Password" />
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

export default connect(mapStateToProps, { signUpUser, signInUser, addUser, loginUser })(UserHome);
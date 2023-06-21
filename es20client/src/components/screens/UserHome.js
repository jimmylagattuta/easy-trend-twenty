import React, { Component } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { signUpUser, signInUser, addUser, loginUser } from '../../actions';
import { connect } from 'react-redux';
import './UserHome.css';

// function SendHomeScreen() {
//   const navigate = Redirect();

//   useEffect(() => {
//     if (this.props.user_in_app_state) {
//       navigate("/homepage");
//     }
//   }, []);
// }

class UserHome extends Component{
	constructor(props){  
	    super(props);  
	    this.state = {  
	         data: 'www.javatpoint.com',
	         user_email: '',
	         redirect: false,
	         error: "",
	         errorPasswordMismatch: ""
	      }  
	    this.handleEvent = this.handleEvent.bind(this);  
	}
	handleEvent(){  
	    // console.log('props! will convert to actions and reducers after signup login logout and is_logged_in?', this.props);  
	}
	onSubmit(values) {
		console.log('onSubmit sign up!', values);
		const s = document.getElementById('yourSelect');
		console.log('s', s);
		const passwordOne = values.password;
		const passwordTwo = values.password_confirmation;
		if (passwordOne !== passwordTwo) {
			this.setState({ errorPasswordMismatch: "Password Mismatch" });
		} else {
			this.setState({ errorPasswordMismatch: "" });
			fetch("api/v1/signup", {
		      method: "POST",
		      credentials: 'same-origin',
		      headers: {
		        "Content-Type": "application/json",
		      },
		      body: JSON.stringify(values),
		    }).then((res) => {
	    	  // console.log('response', res);
		      if (res.ok) {
		        res.json().then((user) => {
		        	// console.log('setCurrentUser(user)');
		        	// console.log('UserHome onSubmit response api/v1/signup user', user);
		        	this.props.setUserObject(user, "homescreen");
		        	this.setState({ redirect: true });
		          // reimplement
		          // setCurrentUser(user);
		        });
		      } else {
		        res.json().then((errors) => {
		          // console.error('errors onSubmit SignUpUser!', errors);
		        });
		      }
		    });

		}
		// bringing into component to design in uniform, will branch to refactor later
		// this.props.addUser(values, this.props.cookie);

	}
	onSubmitSignIn(values) {
		console.log('onSubmit SignInUser!', values);
		// console.log('onSubmit SignInUser!', values);
		fetch("api/v1/login", {
	      method: "POST",
	      credentials: 'same-origin',
	      headers: {
	        "Content-Type": "application/json",
	      },
	      body: JSON.stringify(values),
	    }).then((res) => {
    	  // console.log('response', res);
	      if (res.ok) {
	        res.json().then((user) => {
	        	// console.log('setCurrentUser(user)');
		        	// console.log('user', user);
	        	if (user.logged_in) {
		        	this.props.setUserObject(user, "homescreen", user.cart_items);
		        	this.setState({ redirect: true, error: "" });

	        	} else {
		        	this.setState({ error: "Login Failed" });

	        	}
	          // reimplement
	          // setCurrentUser(user);
	        });
	      } else {
	        res.json().then((errors) => {
	          // console.error('errors onSubmit SignInUser!', errors);
	        });
	      }
	    })
	    .then(() => {
	    	this.setState({ redirect: false });
	    });
		// removing redux to configure then will branch to add back redux
		// this.props.loginUser(values);
	}
	renderSecurityQuestionsDropdown() {
		return (
		  	<div className="security-questions-div">
				<div className="security-question">
				    <label className="security-question-item">
				    	Security Question One
					</label>
		            <Field name="security_question_one" component="select">
		           	  <option />
		              <option value="What is your favorite childhood trip?(1)">1) What is your favorite childhood trip?</option>
		              <option value="What is your favorite childhood trip?(2)">2) What is your favorite childhood trip?</option>
		              <option value="What is your favorite childhood trip?(3)">3) What is your favorite childhood trip?</option>
		            </Field>
					<Field className="sign-up-item" name="security_answer_one" component="input" placeholder="Answer" />
				</div>
		   	</div>
		);
	}
	render() {
		// console.log('UserHome props state', this.props, this.state);
		// old code that worked
		// console.log('this.props UserHome render ~>', this.props);
		// console.log('this.state UserHome render ~>', this.state);
		const { redirect } = this.state;
		if (redirect || this.props.user_in_app_state.logged_in) {
			return <Redirect to="/homepage" />;
		}
		return (
			<div className="App">
				<Form
				    onSubmit={this.onSubmitSignIn.bind(this)}
				    render={({ handleSubmit }) => (
				      <form onSubmit={handleSubmit}>
				        <h1>Sign In!</h1>
					      	<p id="red">{this.state.error}</p>
				        <div>
				        	<label className="sign-up-item">Email or Username(Case Sensitive)</label>
				          	<Field name="email_or_username" component="input" placeholder="Email or Username" />
				        </div>
				        <div>
				        	<label className="sign-up-item">Password</label>
				          	<Field name="password" component="input" type="password" placeholder="Password" />
				        </div>
				        <div className="sign-in-and-forgot-password">
					        <button type="submit" name="sign-in-button" onClick={() => {
					        	this.handleSubmit();
					        }}>Submit</button>
				    	</div>
				      </form>
				    )}
				  />
				<Form
				    onSubmit={this.onSubmit.bind(this)}
				    render={({ handleSubmit }) => (
				      <form onSubmit={handleSubmit}>
				        <h1>Sign Up!</h1>
				        <div>
				          <label className="sign-up-item">First Name</label>
				          <Field name="first_name" component="input" placeholder="First Name" />
				        </div>
				        <div>
				        	<label className="sign-up-item">Last Name</label>
				          	<Field name="last_name" component="input" placeholder="Last Name" />
				        </div>
				        <div>
				        	<label className="sign-up-item">Email</label>
				          	<Field name="email" component="input" placeholder="Email" />
				        </div>
				        <div>
				        	<label className="sign-up-item">Password</label>
				          	<Field name="password" component="input" type="password" placeholder="Password" />
				        </div>
				        <p id="red">{this.state.errorPasswordMismatch}</p>
				        <div>
				        	<label className="sign-up-item">Password Confirmation</label>
				          	<Field name="password_confirmation" component="input" type="password" placeholder="Password Confirmation" />
				        </div>
				        {this.renderSecurityQuestionsDropdown()}
				        <button type="submit">Submit</button>
				      </form>
				    )}
				  />
				<Link onClick={() => {
			        	console.log('Forgot Password');
					}}
					to="/forgotpassword"
				>

						<button>Forgot Password</button>

				</Link>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { user_object, cookie } = state.user_object;
	return { user_object, cookie };
}

export default connect(mapStateToProps, { signUpUser, signInUser, addUser, loginUser })(UserHome);
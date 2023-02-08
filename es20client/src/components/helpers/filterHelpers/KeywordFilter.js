import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Field, useFormState } from 'react-final-form'
import './KeywordFilter.css';

class KeywordFilter extends Component {
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
	onSubmitSignIn(values) {
		// console.log('onSubmit SignInUser!', values);
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
	        	this.props.setUserObject(user, "homescreen", user.cart_items);
	        	this.setState({ redirect: true });
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
	onSubmit(values) {
		// console.log('onSubmit sign up!', values);
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
		// bringing into component to design in uniform, will branch to refactor later
		// this.props.addUser(values, this.props.cookie);

	}
	onChangeSearchTerm(values) {
		console.log('values', values);

	}
	// <Field type="checkbox" name="keyword" component="input" placeholder="Keyword" />
	render() {
		console.log('KeywordFilter Component props', this.props);
		return (
			<div className="keyword-filter-product-div">
				<div className="keyword-filter-div">
				<Form
				    onSubmit={this.onChangeSearchTerm.bind(this)}
				    render={({ handleSubmit }) => (
				      <form onSubmit={handleSubmit}>
				        <div>
				          	<Field
							    onChange={() => {
							    	const formState = useFormState();
							    	console.log('formState', formState);
								    this.onChangeSearchTerm(formState);
								}}
				          		name="keyword" component="input" placeholder="Keyword" />
				        </div>
				      </form>
				    )}
				  />
				</div>
			</div>
		);
	}
}

export default KeywordFilter;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './CategoryFilter.css';

class CategoryFilter extends Component {
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
		// console.log('values', values);

	}
	// <Field type="checkbox" name="keyword" component="input" placeholder="Keyword" />
	render() {
	    const handleChange = (event) => {
	    	// console.log('this.props CategoryFilter', this.props);
	        this.props.sortFilteredProducts(event.target.value, this.props.filteredProducts);
	    };
	    let categories = ["None"];
	    this.props.filteredProducts.map((p) => {
	    	const cat = p.product.category.charAt(0).toUpperCase() + p.product.category.slice(1);
	    	if (!categories.includes(cat)) {

	    		categories.push(cat);
	    	}
	    });
	    const defaultOption = this.props.category;
	    const handleChangeCategory = (event) => {
	    	// console.log('handleChangeCategory', event.value);
	        this.props.categorizeFilteredProducts(event.value, this.props.filteredProducts);
	    };
		return (
			<div className="category-div">
			    <form>
			      <div className="category-dropdown-div">
				      <h1>Search Category:{" "}</h1>
					  <div className="dropdown-div"><Dropdown options={categories} onChange={handleChangeCategory} value={defaultOption} placeholder="Select an Category" /></div>
				  </div>
			    </form>
			</div>
		);
	}
}

export default CategoryFilter;
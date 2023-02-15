import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link, withRouter, Redirect } from "react-router-dom";
import SuperAdminSettings from './settings/SuperAdminSettings';
import SettingsUser from './settings/SettingsUser';
import StandardSettings from './settings/StandardSettings';


class SettingsUserHome extends React.Component {
	constructor(props){  
	    super(props);  
	    this.state = {  
	         redirectChangePassword: false
	      }
	}
	componentDidUpdate() {
		if (this.state.redirectChangePassword) {
			// console.log('did run 2e?');
			this.setState({ redirectChangePassword: false });
		}
	}
	redirectChangePassword() {
		console.log('redirecting');
		this.props.history.push("/homescreen");
	}
	render() {
		console.log('SettingsUserHome props', this.props);
		if (this.props.user_in_app_state.logged_in && this.props.user_in_app_state.user.super_admin) {
			// console.log('SuperAdmin');
			return (
				<div>
			    	<SuperAdminSettings user_in_app_state={this.props.user_in_app_state} setUserObject={this.props.setUserObject.bind(this)} navigateScreen={this.props.navigateScreen} />
			    	<StandardSettings user_in_app_state={this.props.user_in_app_state} setUserObject={this.props.setUserObject.bind(this)} navigateScreen={this.props.navigateScreen} />
			    </div>
			);
		} else if (this.props.user_in_app_state.logged_in) {
			// console.log('RegularUser');
			// change to StandardSettings
			return <StandardSettings user_in_app_state={this.props.user_in_app_state} setUserObject={this.props.setUserObject.bind(this)} navigateScreen={this.props.navigateScreen.bind(this)} redirectChangePassword={this.redirectChangePassword.bind(this)} />;
		}
	}
}
export default withRouter(SettingsUserHome);
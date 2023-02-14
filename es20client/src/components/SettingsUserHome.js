import React from 'react';
import { connect } from 'react-redux';
import SuperAdminSettings from './settings/SuperAdminSettings';
import SettingsUser from './settings/SettingsUser';
import StandardSettings from './settings/StandardSettings';


class SettingsUserHome extends React.Component {

	render() {
		// console.log('SettingsUserHome props', this.props);
		if (this.props.user_in_app_state.logged_in && this.props.user_in_app_state.user.super_admin) {
			// console.log('SuperAdmin');
			return (
				<div>
			    	<SuperAdminSettings user_in_app_state={this.props.user_in_app_state} setUserObject={this.props.setUserObject.bind(this)} />
			    	<StandardSettings user_in_app_state={this.props.user_in_app_state} setUserObject={this.props.setUserObject.bind(this)} />
			    </div>
			);
		} else if (this.props.user_in_app_state.logged_in) {
			// console.log('RegularUser');
			// change to StandardSettings
			return <StandardSettings user_in_app_state={this.props.user_in_app_state} setUserObject={this.props.setUserObject.bind(this)} />;
		}
	}
}

export default SettingsUserHome;
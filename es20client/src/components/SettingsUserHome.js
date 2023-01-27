import React from 'react';
import { connect } from 'react-redux';
import SuperAdminSettings from './settings/SuperAdminSettings';
import SettingsUser from './settings/SettingsUser';

class SettingsUserHome extends React.Component {

	render() {
		console.log('SettingsUserHome props', this.props);
		if (this.props.user_in_app_state.user.super_admin) {
			console.log('SuperAdmin');
			return <SuperAdminSettings user={this.props.user_in_app_state} setUserObject={this.props.setUserObject.bind(this)} />;
		} else {
			console.log('RegularUser');
			return <SettingsUser user={this.props.user_in_app_state} setUserObject={this.props.setUserObject.bind(this)} />;
		}
	}
}

export default SettingsUserHome;
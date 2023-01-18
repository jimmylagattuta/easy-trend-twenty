import React from 'react';
import { connect } from 'react-redux';

class SettingsHome extends React.Component {

	render() {
		if (this.props.user_in_app_state.user.super_admin) {
			return (
				<SuperAdminSettings user={this.props.user_in_app_state} setUserObject={this.props.setUserObject.bind(this)} />
			);
		}
		console.log('SettingsHome props', this.props);
		return <div><h1>SettingsHome</h1></div>;
	}
}

export default SettingsHome;
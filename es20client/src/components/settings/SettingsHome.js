import React from 'react';
import { connect } from 'react-redux';

class SettingsHome extends React.Component {

	render() { 
		console.log('SettingsHome props', this.props);
		return <div><h1>SettingsHome</h1></div>;
	}
}

export default SettingsHome;
import React from 'react';
import { connect } from 'react-redux';
import SuperAdminSettings from './SuperAdminSettings';

class SettingsHome extends React.Component {
  constructor(props){  
      super(props);  
      this.state = {  
      	   consumer: null,
           employee: null,
           admin: null,
           product: null,
           consumers: null,
           employees: null,
           admins: null,
           products: null
        }  
      this.handleEvent = this.handleEvent.bind(this);  
  }
  handleEvent(){  
  } 
	render() { 
		console.log('SettingsHome props', this.props);
		if (this.props.user_in_app_state.user) {
			const rank = this.props.user_in_app_state.user;
			if (rank.super_admin) {
				return (
					<SuperAdminSettings user={this.props.user_in_app_state} />
				);
			}
		}
		return <div><h1>SettingsHome</h1></div>;
	}
}

export default SettingsHome;
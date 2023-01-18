import React from 'react';
import { connect } from 'react-redux';

class SuperAdminSettings extends React.Component {
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
  componentDidMount() {
    fetch("api/v1/super_get", {
      credentials: "same-origin",
    }).then((res) => {
      if (res.ok) {
        res.json().then((super_get_bundle) => {
          console.log('super_get_bundle ~>', super_get_bundle);
        });
      } else {
      	console.log('super_get_bundle not ok');
        // console.log('setAuthenticated(true)');
        // reimplement
        // setAuthenticated(true);
      }
    }).catch((err) => {
    	console.log('error super_get', err);
    });
  }
	render() { 
		console.log('SuperAdminSettings props', this.props);
		return <div><h1>SuperAdminSettings</h1></div>;
	}
}

export default SuperAdminSettings;
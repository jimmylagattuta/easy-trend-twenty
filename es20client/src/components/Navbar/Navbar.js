import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MenuItems } from "./MenuItems";
import { Button } from "../Button";
import { connect } from 'react-redux';
import { signOutUser, logoutUser, fetchLoginStatus } from '../../actions';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Navbar.css';
import Logo from './fakelogo.png';

class Navbar extends Component {
	state = {
		clicked: false, popUpGo: false

	}
  	componentDidMount() {
  		// moving to higher component
    	// this.props.fetchLoginStatus();
  	}
	handleClick = () => {
		// console.log('clicked');
		this.setState({ clicked: !this.state.clicked });
	}
	renderEasyTrend() {
		// console.log('renderEasyTrend');
		const operatingSystem = navigator.appVersion;
		if (operatingSystem.includes('Macintosh')) {
			return (
				<Link to="/homescreen"><h1 className="navbar-logo">Easy Trend 20<i className="fas fa-hat-wizard"></i></h1></Link>
			);
		} else if (operatingSystem.includes('Windows')) {
			return (
				<Link to="/homescreen"><h1 className="navbar-logo-windows">Easy Trend 20<i className="fas fa-hat-wizard"></i></h1></Link>
			);
		} else {
			console.log('Operating System not Macitosh or Windows Easy Trend And Logo');
		}
	}
	renderSignupButton() {
		// console.log('renderSignupButton');
		const operatingSystem = navigator.appVersion;
		if (operatingSystem.includes('Macintosh')) {
			return (
				<Link to="/userhome"><Button>Sign Up</Button></Link>
			);
		} else if (operatingSystem.includes('Windows')) {
			return (
				<Link to="/userhome"><Button><div id="signup-windows">Sign Up</div></Button></Link>
			);
		} else {
			console.log('Operating System not Macitosh or Windows Signup Button');
		}
	}
	renderNavHome() {
		return (
			<nav className="NavbarItems">
				{this.renderEasyTrend()}
				<div className="menu-icon" onClick={this.handleClick}>
					<i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
				</div>
				<ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
					{MenuItems.map((item, index) => {
						return (
							<li key={index}>
								<Link to={item.linkTo}><a className={item.cName} href={item.url}>
								{item.title}
								</a></Link>
							</li>
						);
					})}
				</ul>
				{this.renderSignupButton()}
			</nav>
		);
	}
	handleLogout() {
  		fetch('api/v1/logout', {method: "DELETE"})
  			.then(res => {
        		if (res.ok) {
          			this.props.setUserObject(null);
        		}
      		})
    		.catch((error) => {
    			console.log('Navbar handleLogout error', error);
    		});
	}
	renderNavUser() {
		return (
			<nav className="NavbarItems">
				{this.renderEasyTrend()}
				<div className="menu-icon" onClick={this.handleClick}>
					<i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
				</div>
				<ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
					{MenuItems.map((item, index) => {
						return (
							<li key={index}>
								<Link to={item.linkTo}><a className={item.cName} href={item.url}>
								{item.title}
								</a></Link>
							</li>
						);
					})}
				</ul>
				<Popup
				    trigger={<Button>Sign Out</Button>}
				    modal
				    nested
				  >
				    {close => (
				      <div className="modal">
				        <h1 className="header"> Are you sure you want to sign out? </h1>
				      
				        <div className="actions">
				          <Button
				            className="button"
				            onClick={() => {
				              console.log('Yes');
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// move to different kind of component
// --------------------------------------------------------------------------------------------------
				              // this.props.logoutUser(this.props.user_in_app_state); |5:48PM 01/15/2023|
// ------------------------------------------------------------------------------------------------------
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
				              this.handleLogout();
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
				              close();
				            }}
				          >
				            Yes
				          </Button>				       
				          <Button
				            className="button"
				            onClick={() => {
				              console.log('No');
				              close();
				            }}
				          >
				            No
				          </Button>
				        </div>
				      </div>
				    )}
				</Popup>
			</nav>
		);
	}
    // ^ for Popup 'top left', 'top center', 'top right', 'right top', 'right center', 'right bottom', 'bottom left', 'bottom center', 'bottom right', 'left top', 'left center', 'left bottom', 'center center',
	renderNavTrack() {
		if (!this.props.user_in_app_state) {
			return (
				<div>
					{this.renderNavHome()}
				</div>
			);
		} else {
			return (
				<div>
					{this.renderNavUser()}
				</div>
			);
		} 
	}
	render() {
		console.log('Navbar props, state ~>', this.props, this.state);
		// console.log('this.state Navbar ~>', this.state);
		// console.log('navigator', navigator);
		return (
			<div>
				{this.renderNavTrack()}
			</div>
		);
	} 
}


const mapStateToProps = (state) => {
	const { user_object } = state.user_object;
	return { user_object };
}
const mapDispatchToProps = dispatch => {
    return {
        fetchLoginStatus: () => { dispatch(fetchLoginStatus()) }
    }
};
export default connect(mapStateToProps, { signOutUser, logoutUser, fetchLoginStatus })(Navbar);
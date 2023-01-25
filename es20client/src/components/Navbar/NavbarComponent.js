import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
		clicked: false, popUpGo: false, redirect: false

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
				// <Link to="/homescreen"><h1 className="navbar-logo">Easy Trend 20<i className="fas fa-hat-wizard"></i></h1></Link>
				<Link onClick={() => this.props.setScreen({ screen: "homescreen" })} to="/homescreen"><h1 id="add-hover" className="navbar-logo">Easy Trend 20<i className="fas fa-hat-wizard"></i></h1></Link>
			);
		} else if (operatingSystem.includes('Windows')) {
			return (
				<Link to="/homescreen"><h1 id="add-hover" className="navbar-logo-windows">Easy Trend 20<i className="fas fa-hat-wizard"></i></h1></Link>
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
	renderCartNav() {
		if (this.props.cart) {
			return (
				<div id="cart-div"><i class="fab fa-opencart"></i><p id="cart-length" className="p-cart">{this.props.cart.cart_items.length}</p></div>
			);	
		} else {
			return (
				<div id="cart-div"><i class="fab fa-opencart"></i><p id="cart-length" className="p-cart">{0}</p></div>
			);	
		}
	}
	renderNavHome() {
		return (
			<nav className="NavbarItems">
				<div className="nav-div-group">
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
					<Link to="/cart">
						<h1 id="add-hover" className="menu-turn-white">
							{this.renderCartNav()}
						</h1>
					</Link>
					{this.renderSignupButton()}
				</div>
			</nav>
		);
	}
	handleLogout(setUserObject) {
  		fetch('api/v1/logout', {method: "DELETE"})
  			.then(res => {
        		if (res.ok) {
        			const resetUserInAppState = {
        				logged_in: false,
        				user: null
        			};
          			setUserObject(resetUserInAppState, "homescreen");
          			this.setState({ redirect: true });
        		}
      		})
      		.then(() => {
      			this.setState({ redirect: false });
      		})
    		.catch((error) => {
    			console.log('Navbar handleLogout error', error);
    		});
	}
	// reimplement popup signin renderPopup
	renderPopup(handleLogout, setUserObject) {
		// console.log('renderPopup setUserObject', setUserObject);
		return (
			<div className="popup-signout">
				<Popup
			    trigger={
			    	<div className="button">
			    		<Button>Sign Out</Button>
			    	</div>
			    }
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
			              handleLogout(setUserObject).bind(this);
			              // set screen(ok) and redirect(automatic?)
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
			</div>
		);
	}
	renderSettingsButton() {
		// console.log('Navbar renderSettingsButton props', this.props);
		let screen = '';
		if (this.props.screen && this.props.screen.screen) {
			screen = this.props.screen.screen;
		} else {
			screen = this.props.screen;
		}
		if (screen === "settingsscreen") {
			return (
				<div>
					{this.renderPopup(this.handleLogout.bind(this), this.props.setUserObject)}
				</div>
			);
		} else {
			return (
				<div onClick={() => this.props.setScreen('settingsscreen')} id="add-hover-settings" className="make-row">
						<Link to="/settingshome">
							<h1 id="inner-element" className="user-settings-cog"><i class="fas fa-user-cog"></i></h1>
						</Link>
						<Link to="/settingshome">
							<p id="inner-element" className="account-holder">{this.props.user_in_app_state.user.first_name}</p>
						</Link>
				</div>
			);
		}
	}
	renderNavUser(user) {
		if (user.consumer) {
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
					{this.renderPopup(this.handleLogout, this.props.setUserObject)}
				</nav>
			);
		} else {
			return (
				<nav className="NavbarItems">
					{this.renderEasyTrend()}
					<div className="menu-icon" onClick={this.handleClick}>
						<i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
					</div>
					<ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
						{MenuItems.map((item, index) => {
							if (item.title === "Sign Up") {
							} else {
								return (
									<li onClick={() => this.props.setScreen(item.screen)} key={index}>
										<Link to={item.linkTo}><h1 id="add-hover" className="menu-turn-white"><i class={item.class}></i></h1></Link>
									</li>
								);
							}
						})}
						<Link to="/cart">
							<h1 id="add-hover" className="menu-turn-white">
								{this.renderCartNav()}
							</h1>
						</Link>
						{this.renderSettingsButton()}
					</ul>

				</nav>
			);			
		}
	}
    // ^ for Popup 'top left', 'top center', 'top right', 'right top', 'right center', 'right bottom', 'bottom left', 'bottom center', 'bottom right', 'left top', 'left center', 'left bottom', 'center center',
	renderNavTrack() {
		if (this.props.user_in_app_state.logged_in) {
			return (
				<div>
					{this.renderNavUser(this.props.user_in_app_state.user)}
				</div>
			);
		} else {
			return (
				<div>
					{this.renderNavHome()}
				</div>
			);
		} 
	}
	render() {
		console.log('Navbar props, state ~>', this.props, this.state);
		// console.log('this.state Navbar ~>', this.state);
		// console.log('navigator', navigator);
		if (this.state.redirect) {
			return <Redirect to="/homescreen" />;
		}
		return (
			<div className="navbar-div-top">
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
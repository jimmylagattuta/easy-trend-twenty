import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { MenuItems } from "./MenuItems";
import { Button } from "../Button";
import { connect } from 'react-redux';
import CartComponent from './CartComponent';
import { signOutUser, logoutUser, fetchLoginStatus } from '../../actions';
import MiniMenu from './navhelpers/MiniMenu';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Navbar.css';
import Logo from './fakelogo.png';

class Navbar extends Component {
	// changed all className to class 1/2923 7:49PM
	state = {
		clicked: false, popUpGo: false, redirect: false, redirectSettings: false, redirectLogout: false, redirectCartGuest: false
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
	renderCheckout(cart_items) {
		if (cart_items.length) {
			return (
				<Button
					id="mini-nav-button-element"
					// className="ui button primary"
					onClick={() => {
						// console.log('Checkout Cart Screen');
						this.props.navigateScreen("guestcart");
						this.setState({ redirectCartGuest: true });
					}} 
				>
					<p className="mini-menu-select">Checkout</p>
				</Button>
			);
		}
	}
	renderCartNavNoUser() {
		// console.log('renderCartNavNoUser props', this.props);
		// console.log('renderCartNavNoUser state', this.state);
			return (
				<div id="cart-div-component">
					<div className="dropdown">
					  <i className="fab fa-opencart"></i>
					  <p id="cart-length" className="p-cart-component">
						{this.props.cartItemsNoUser.length}
					  </p>
					  <div className="dropdown-content">
					  	<div className="cart-and-checkout">
						  	<MiniMenu 
						  		cartItemsNoUser={this.props.cartItemsNoUser}
						  		changeCartItemGuest={this.props.changeCartItemGuest}
							/>
							{this.renderCheckout(this.props.cartItemsNoUser)}
					  	</div>
					  </div>
					</div>
				</div>
			);
	}
	renderCartNav() {
		if (this.props.cart_items) {
			return (
				<div id="cart-div-component">
					<div className="dropdown">
					  <i className="fab fa-opencart"></i>
					  <p id="cart-length" className="p-cart-component">
						{this.props.cart_items.length}
					  </p>
					  <div className="dropdown-content">
					  <p>Hello</p>
					  </div>
					</div>
				</div>
			);
		} else {
			return (
				<div id="cart-div"><i className="fab fa-opencart"></i><p id="cart-length" className="p-cart">{0}</p></div>
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
					<div id="show-cart" to="/cart">
						<h1 id="add-hover" className="menu-turn-white">
							{this.renderCartNavNoUser()}

						</h1>
					</div>
					{this.renderSignupButton()}
				</div>
			</nav>
		);
	}
	handleLogout(setUserObject) {
  		fetch('api/v1/logout', {method: "DELETE"})
  			.then(res => { 
			        res.json().then((response) => {
        				// console.log('res not .ok ', response);
        				const resetUserInAppState = {
        					logged_in: false,
        					user: null
        				};
          				this.setState({ redirectLogout: true });
          				setUserObject(resetUserInAppState, "homescreen", []);
          			})
          			.catch((err) => {
          				console.log('err handleLogout', err);
          			});

      		})
      		.then(() => {
      			this.setState({ redirectLogout: false });
      		})
    		.catch((error) => {
    			// console.log('Navbar handleLogout error', error);
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
			              // console.log('Yes');
			              handleLogout(setUserObject.bind(this));
			              // set screen(ok) and redirect(automatic?)
			              close();
			            }}
			          >
			            Yes
			          </Button>				       
			          <Button
			            className="button"
			            onClick={() => {
			              // console.log('No');
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
			// console.log('we were here', this.props);
			return (
				<div onClick={() => {
					this.props.setScreen('settingsscreen');
					this.setState({ redirectSettings: true });
				}
				} id="add-hover-settings" className="make-row">
						<Link to="/settingshome">
							<h1 id="inner-element" className="user-settings-cog"><i className="fas fa-user-cog"></i></h1>
						</Link>
						<Link to="/settingshome">
							<p id="inner-element" className="account-holder">{this.props.user_in_app_state.user.first_name}</p>
						</Link>
				</div>
			);
		}
	}
	renderNavUser(user) {
		// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
									<Link to={item.linkTo}><h1 id="add-hover" className="menu-turn-white"><i className={item.class}></i></h1></Link>
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
		
	    // ^ for Popup 'top left', 'top center', 'top right', 'right top', 'right center', 'right bottom', 'bottom left', 'bottom center', 'bottom right', 'left top', 'left center', 'left bottom', 'center center',
	}
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
		// console.log('Navbar props ~>', this.props);
		// console.log('Navbar state ~>', this.state);
		// console.log('this.state Navbar ~>', this.state);
		// console.log('navigator', navigator);
		if (this.state.redirect) {
			this.setState({ redirect: false });
			return <Redirect to="/homescreen" />;
		}
		if (this.state.redirectSettings) {
			this.setState({ redirectSettings: false });
			return <Redirect to="/settingshome" />;
		}
		if (this.state.redirectCartGuest) {
			this.setState({ redirectCartGuest: false });
			return <Redirect to="/cartguest" />;
		}
		if (this.state.redirectLogout) {
			// console.log('redirectingLogout props', this.props);
			// console.log('redirectingLogout state', this.state);
			this.setState({ redirectLogout: false });
			// this is not necessary, redirect already goes to homescreen
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
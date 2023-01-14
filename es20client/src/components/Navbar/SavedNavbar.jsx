import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MenuItems } from "./MenuItems";
import { Button } from "../Button";
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Navbar.css';
import Logo from './fakelogo.png';

class Navbar extends Component {
	state = {
		clicked: false, popUpGo: false
	}

	handleClick = () => {
		console.log('clicked');
		this.setState({ clicked: !this.state.clicked });
	}
	renderNavHome() {
		return (
			<nav className="NavbarItems">
				<Link to="/"><h1 className="navbar-logo">Easy Trend 20<i className="fas fa-hat-wizard"></i></h1></Link>
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
				<Link to="/userhome"><Button>Sign Up</Button></Link>
			</nav>
		);
	}
	renderNavUser() {
		return (
			<nav className="NavbarItems">
				<Link to="/"><h1 className="navbar-logo">Easy Trend 20<i className="fas fa-hat-wizard"></i></h1></Link>
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
						<button className="close" onClick={close}>
				          &times;
				        </button>
				<Popup trigger={<Button>Sign Out</Button>} position="right center">
			    	<div>Confirm Signout</div>
			    	<button onClick={() => console.log('Yes')}>Yes</button>
			    	<button onClick={() => console.log('No')}>No</button>
			  	</Popup>
			</nav>
		);
	}
	  // ^ for Popup 'top left', 'top center', 'top right', 'right top', 'right center', 'right bottom', 'bottom left', 'bottom center', 'bottom right', 'left top', 'left center', 'left bottom', 'center center',
	render() {
		console.log('this.props Navbar ~>', this.props);
		console.log('this.state Navbar ~>', this.state);
		if (!this.props.user_object) {
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
}


const mapStateToProps = (state) => {
	const { user_object } = state.user_object;
	return { user_object };
}

export default connect(mapStateToProps)(Navbar);
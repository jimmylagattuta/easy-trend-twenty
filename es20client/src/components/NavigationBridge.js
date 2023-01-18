import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Route, Link, withRouter, Redirect } from "react-router-dom";
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import HomeScreen from './HomeScreen';
import ProductsHome from './ProductsHome';
import CareersHome from './CareersHome';
import ContactUsHome from './ContactUsHome';
import UserHome from './UserHome';
import SettingsHome from './settings/SettingsHome';
import Navbar from './Navbar/Navbar';
import NavigateToScreen from './helpers/NavigateToScreen';
import './App.css';

class NavigationBridge extends Component {
  constructor(props){  
      super(props);  
      this.state = {  
           data: 'www.javatpoint.com',
           user_in_app_state: {
              logged_in: false,
              user_in_app_state: null
           },
           screen: "homescreen"
        }  
      this.handleEvent = this.handleEvent.bind(this);  
  }
  handleEvent(){  
    
    // console.log('NavigationBridge handleEvent. this.props', this.props);
    // console.log('NavigationBridge handleEvent. this.state', this.state);
  } 
  componentDidMount() {
    // console.log('componentDidMount props state NOT YET RUNNING 4:04PM01/15/23(infinite loop userhome)', this.props, this.state);
    const screenToken = localStorage.getItem('currentScreen');
    fetch("api/v1/logged_in", {
      credentials: "same-origin",
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          // console.log('user ~>', user);
          // console.log('user.logged_in ~>', user.logged_in);

          // console.log('this.state is_logged_in? before', this.state);
          if (user.logged_in) {
            this.setState({ user_in_app_state: user, screen: screenToken });
            // console.log('this.state is_logged_in? after', this.state);
            // reimplement
            // console.log('setCurrentUser(user)');
            // setCurrentUser(user);
            // reimplement
            // console.log('setAuthenticated(true)');
            // setAuthenticated(true);
          } else {

          }
        });
      } else {
        // console.log('setAuthenticated(true)');
        // reimplement
        // setAuthenticated(true);
      }
    });
  }
  setUserObject(user_in_app_state, screen) {
    // console.log('setUserObject user_in_app_state', user_in_app_state, screen);
    localStorage.setItem('currentScreen', screen);
    this.setState({ user_in_app_state: user_in_app_state, screen: screen });
  }  
  navigateScreen(screen) {
    // console.log('navigateScreen screen', screen);
    localStorage.setItem('currentScreen', screen);
    this.setState({ screen: screen });
  }
  setScreen(screen) {
    // console.log('XXXsetScreen screen', screen);
    localStorage.setItem('currentScreen', screen);
    this.setState({ screen: screen});
  }
  render() {  
    console.log('NavigationBridge props state', this.props, this.state);
    return (
      <div>
          <div className="App">
            <Navbar screen={this.state.screen} setScreen={this.setScreen.bind(this)} user_in_app_state={this.state.user_in_app_state} setUserObject={this.setUserObject.bind(this)} navigateScreen={this.navigateScreen.bind(this)} />
            <h1>(...under construction...)</h1>
            <Route 
              path="/homescreen" 
              render= { (props) => <HomeScreen user_in_app_state={this.state.user_in_app_state} /> }
            />
            <Route 
              path="/productshome" 
              render= { (props) => <ProductsHome user_in_app_state={this.state.user_in_app_state} /> }
            />            
            <Route 
              path="/careershome" 
              render= { (props) => <CareersHome user_in_app_state={this.state.user_in_app_state} /> }
            />  
            <Route 
              path="/contactushome" 
              render= { (props) => <ContactUsHome user_in_app_state={this.state.user_in_app_state} /> }
            />
            <Route 
              path="/settingshome" 
              render= { (props) => <SettingsHome user_in_app_state={this.state.user_in_app_state} /> }
            />
            <Route
              path="/userhome"
              render= { (props) => <UserHome
                                      setUserObject={this.setUserObject.bind(this)}
                                      navigateScreen={this.navigateScreen.bind(this)}
                                      user_in_app_state={this.state.user_in_app_state}
                                    />
                      }
            />
          </div>
      </div>
    );
  }
}

export default withRouter(NavigationBridge);
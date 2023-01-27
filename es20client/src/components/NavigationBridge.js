import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Route, Link, withRouter, Redirect } from "react-router-dom";
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import HomeScreen from './HomeScreen';
import ProductsHome from './ProductsHome';
import CareersHome from './CareersHome';
import ContactUsHome from './ContactUsHome';
import UserHome from './UserHome';
import SettingsUserHome from './SettingsUserHome';
import NavbarComponent from './Navbar/NavbarComponent';
import NavigateToScreen from './helpers/NavigateToScreen';
import jsonValues from './jsonValues';
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
           screen: "homescreen",
           products: null,
           cart_items: []
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
          // console.log('response logged_in ~>', user);
          // console.log('cart ~>', user.cart);
          // console.log('cart_items ~>', user.cart_items);

          // console.log('user.logged_in ~>', user.logged_in);

          // console.log('this.state is_logged_in? before', this.state);
          if (user.logged_in) {
            this.setState({ user_in_app_state: user, screen: screenToken, cart_items: user.cart_items });
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
    }).then((res) => {
      fetch("api/v1/all_products", {
        credentials: "same-origin",
      }).then((res) => {
        if (res.ok) {
          res.json().then((response) => {
            // console.log('response all_products', response);
            this.setState({ products: response });
          });
        } else {
          // console.log('res not ok all_products', res);
        }
      })
      .catch((err) => {
        // console.log('error logged_in or all_products', err);
      })
    });
  }
  setUserObject(user_in_app_state, screen, cart_items) {
    console.log('setUserObject user_in_app_state', user_in_app_state, screen, cart_items);
    localStorage.setItem('currentScreen', screen);
    this.setState({ user_in_app_state: user_in_app_state, screen: screen, cart_items: cart_items });
  }  
  navigateScreen(screen) {
    // console.log('navigateScreen screen', screen);
    localStorage.setItem('currentScreen', screen);
    this.setState({ screen: screen });
  }
  setScreen(screen) {

    console.log('setScreen state', this.state);
    console.log('setScreen screen', screen);
    localStorage.setItem('currentScreen', screen);
    this.setState({ screen: screen});
  }
  addToCart(item) {
    // console.log('addToCart', item);
    const values = {
      // userObject: this.state.user_in_app_state,
      cartItem: item
    }
    // console.log('values ~~~>', values);
    fetch("api/v1/add_to_cart", {
        method: "POST",
        credentials: 'same-origin',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        // console.log('res add_to_cart', res);
        if (res.ok) {
          res.json().then((new_cart) => {
            // console.log('setCurrentUser(user)');
            // console.log('api/v1/add_to_cart new_cart', new_cart);
            this.setState({ cart_items: new_cart.cart_items });
          });
        } else {
          res.json().then((errors) => {
            // console.error('errors add_to_cart', errors);
          });
        }
      });
    // this.setState({ cart: [...this.state.cart, item ] });
  }
  render() {  
    console.log('NavigationBridge props state', this.props, this.state);
    return (
      <div>
          <div className="App">
            <NavbarComponent screen={this.state.screen} setScreen={this.setScreen.bind(this)} user_in_app_state={this.state.user_in_app_state} setUserObject={this.setUserObject.bind(this)} navigateScreen={this.navigateScreen.bind(this)} cart_items={this.state.cart_items} addToCart={this.addToCart.bind(this)} />
            <h1>(...under construction...)</h1>
            <Route 
              path="/homescreen" 
              render= { (props) => <HomeScreen user_in_app_state={this.state.user_in_app_state} products={this.state.products} addToCart={this.addToCart.bind(this)} /> }
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
              render= { (props) => <SettingsUserHome user_in_app_state={this.state.user_in_app_state} setUserObject={this.setUserObject.bind(this)} /> }
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
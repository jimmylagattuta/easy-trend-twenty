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
import CartGuestHelper from './helpers/CartGuestHelper';
import CartUserHelper from './helpers/CartUserHelper';
import ForgotPassword from './helpers/ForgotPassword';
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
           cart_items: [],
           cartItemsNoUser: [],
           filteredProducts: [],
           searchTerm: "",
           cheapest: false,
           top_rated: false,
           categoryBoolean: false,
           category: "None",
           passwordMessage: null,
           redirectChangePassword: false,
           visible: false
        }  
      this.handleEvent = this.handleEvent.bind(this);  
  }
  handleEvent(){  
    
    // console.log('NavigationBridge handleEvent. this.props', this.props);
    // console.log('NavigationBridge handleEvent. this.state', this.state);
  } 
  componentDidUpdate() {
    if (this.state.passwordMessage) {
      setTimeout(() => {
      this.setState({ passwordMessage: null });
    }, "8000")
    }
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
          // console.log('response logged_in other ~>', res);

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
            this.setState({ products: response, filteredProducts: response });
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
  setUserObject(user_in_app_state, screen, cart_items, message, redirectChangePassword) {
    // console.log('setUserObject', user_in_app_state);
    // console.log('screen', screen);
    // console.log('cart_items', cart_items);
    // console.log('message', message);
    localStorage.setItem('currentScreen', screen);
    if (message === "Received") {
      this.setState({ user_in_app_state: user_in_app_state, screen: screen, cart_items: cart_items, passwordMessage: "Password Updated", redirectChangePassword: true, visible: true });

    } else {
      this.setState({ user_in_app_state: user_in_app_state, screen: screen, cart_items: cart_items });

    }
  }  
  navigateScreen(screen) {
    // console.log('navigateScreen screen', screen);
    localStorage.setItem('currentScreen', screen);
    this.setState({ screen: screen });
  }
  setScreen(screen) {

    // console.log('setScreen state', this.state);
    // console.log('setScreen screen', screen);
    localStorage.setItem('currentScreen', screen);
    this.setState({ screen: screen});
  }
  addToCart(item) {
    // console.log('addToCart', item);
    // console.log('NavigationBridge state', this.state);
    // console.log('NavigationBridge props', this.props);
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
  addToCartNoUser(item, cartItemId) {
    // console.log('item NavigationBrideg addToCartNoUser', item);
    // console.log('cartItemId NavigationBrideg addToCartNoUser', cartItemId);
    if (this.state.cartItemsNoUser.length === 0) {
      // console.log("a) + 1 ", item.product.title);
      this.setState({ cartItemsNoUser: [...this.state.cartItemsNoUser, item] });
    } else {
      let found = false;
      let updatedList = this.state.cartItemsNoUser.map((itemC, index) => 
        {
          if (index == cartItemId || item.productId == itemC.productId){
            // console.log('adding 1 to a cart item');
            found = true;
            return {...itemC, quantity: itemC.quantity + 1}; //gets everything that was already in itemC, and updates "done"
          } else {
            // console.log('returning cart item unchanged');
            return {...itemC}; 
            
          } 

      });
      if (!found) {
        // console.log('adding item not in cart');
        updatedList.push(item);
      }

      this.setState({ cartItemsNoUser: updatedList });
    }

  }
  changeCartItemGuest(operation, cartItemBundle, cartItemId) {
    // console.log('changeCartItemGuest', operation, cartItemBundle);
    if (operation === "+") {
      let updatedList = this.state.cartItemsNoUser.map((item, index) => 
        {
          if (index == cartItemId){
            return {...item, quantity: item.quantity + 1}; //gets everything that was already in item, and updates "done"
          }
          return item; // else return unmodified item 
      });
      this.setState({ cartItemsNoUser: updatedList });

    } else {
      if (cartItemBundle.quantity === 1) {
        const filteredArray = this.state.cartItemsNoUser.filter((item, index) => index !== cartItemId);
        this.setState({ cartItemsNoUser: filteredArray });
      } else {
      let found = false;
        let updatedList = this.state.cartItemsNoUser.map((itemC, index) => 
          {
          if (index == cartItemId || cartItemBundle.productId == itemC.productId){
            // console.log('adding 1 to a cart item');
            found = true;
            return {...itemC, quantity: itemC.quantity - 1}; //gets everything that was already in itemC, and updates "done"
          } else {
            // console.log('returning cart item unchanged');
            return {...itemC}; 
            
          } 
        });
        if (!found) {
          // console.log('adding item not in cart');
          updatedList.push(cartItemBundle);
        }
        this.setState({ cartItemsNoUser: updatedList });
      }

    }
  }
  changeCartItemUser(operation, cartItemBundle, cartItemId) {
    // console.log('changeCartItemUser', operation, cartItemBundle);
    if (operation === "+") {
      const values = {
        // userObject: this.state.user_in_app_state,
        cartItem: cartItemBundle.product
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

    } else {
      const values = {
        // userObject: this.state.user_in_app_state,
        cartItem: cartItemBundle.product
      }
      // console.log('values ~~~>', values);
      fetch("api/v1/minus_from_cart", {
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
              // console.log('api/v1/minus_from_cart new_cart', new_cart);
              this.setState({ cart_items: new_cart.cart_items });
            });
          } else {
            res.json().then((errors) => {
              // console.error('errors add_to_cart', errors);
            });
          }
        });
      
    }
  }
  sortFilteredProducts(user_filter_string, stateFilteredProducts) {
    // console.log('sortFilteredProducts', user_filter_string);
    // console.log('this.state', this.state);
    let searchTermConcat = "";
    let newProducts = [];
    if (user_filter_string.length < this.state.searchTerm.length) {
      this.state.products.map((object) => {
        // console.log('Products');
        const stringConcat = object.product.title + object.product.description + object.product.category;
        const stringConcatUpperCase = stringConcat.toUpperCase();
        const sortUpperCase = user_filter_string.toUpperCase();
        if (stringConcatUpperCase.includes(sortUpperCase)) {
          newProducts.push(object);
        }
      });
      this.setState({ filteredProducts: newProducts, searchTerm: user_filter_string });
    } else {
      stateFilteredProducts.map((object) => {
        // console.log('filteredProducts');
        const stringConcat = object.product.title + " " + object.product.description + " " + object.product.category;
        // console.log('stringConcat', stringConcat);
        const str = stringConcat.replace("'", "");
        // console.log('str', str);
        const stringConcatUpperCase = str.toUpperCase();
        const sortUpperCase = user_filter_string.toUpperCase();
        // console.log('object.product.title', object.product.title);
        // console.log('user_filter_string', user_filter_string);
        // console.log('stringConcatUpperCase.includes(sortUpperCase)', stringConcatUpperCase.includes(sortUpperCase));
        if (stringConcatUpperCase.includes(sortUpperCase)) {
          // console.log('2 object.product.title', object.product.title);
          newProducts.push(object);
        }
      });
      this.setState({ filteredProducts: newProducts, searchTerm: user_filter_string });
    }
  }
  arrangeFilteredProducts(filter) {
    // console.log('arrangeFilteredProducts');
    if (filter === "cheapest") {
      if (this.state.cheapest) {
        const sorted = this.state.filteredProducts.sort((a, b) => {
          // console.log('normal');
            return a.product.id - b.product.id;
        });
        this.setState({ filteredProducts: sorted, cheapest: false });
      } else {
        const sorted = this.state.filteredProducts.sort((a, b) => {
          // console.log('normal');
            return a.product.price - b.product.price;
        });
        this.setState({ filteredProducts: sorted, cheapest: true });
      }
    } else {
      if (this.state.top_rated) {
        const sorted = this.state.filteredProducts.sort((a, b) => {
          // console.log('normal');
            return a.product.id - b.product.id;
        });
        this.setState({ filteredProducts: sorted, top_rated: false });
      } else {
        const sorted = this.state.filteredProducts.sort((a, b) => {
          // console.log('top_rated');
            return b.product.rate - a.product.rate;
        });
        this.setState({ filteredProducts: sorted, top_rated: true });
      }
    }
  }
  categorizeFilteredProducts(category, stateFilteredProducts) {
    let newProducts = [];
    if (category === "None") {
      this.state.products.map((object) => {
          newProducts.push(object);
      });
      this.setState({ filteredProducts: newProducts, category: "None" });
    } else {
      stateFilteredProducts.map((object) => {
        // console.log('object', object);
        const categoryLowerCase = category.toLowerCase();
        // console.log('categoryLowerCase', categoryLowerCase);
        if (object.product.category === categoryLowerCase) {
          newProducts.push(object);
        }
      });
      this.setState({ filteredProducts: newProducts, category: category });
    }
  }
  triggerRedirectChangePassword() {
    this.setState({ redirectChangePassword: false });
  }
  sendForgotEmail(email) {
    console.log('sendForgotEmail to ', email);
  }
  render() {  
    // console.log('NavigationBridge props state', this.props, this.state);
    return (
      <div>
          <div className="App">
            <NavbarComponent
              screen={this.state.screen}
              setScreen={this.setScreen.bind(this)}
              user_in_app_state={this.state.user_in_app_state}
              setUserObject={this.setUserObject.bind(this)}
              navigateScreen={this.navigateScreen.bind(this)}
              addToCart={this.addToCart.bind(this)}
              cartItemsNoUser={this.state.cartItemsNoUser}
              addToCartNoUser={this.addToCartNoUser.bind(this)}
              changeCartItemGuest={this.changeCartItemGuest.bind(this)}
              changeCartItemUser={this.changeCartItemUser.bind(this)}
              cart_items={this.state.cart_items}
              redirectChangePassword={this.state.redirectChangePassword}
              triggerRedirectChangePassword={this.triggerRedirectChangePassword.bind(this)}
            />
            <h1>(...under construction... fake products)</h1>
            <div className={this.state.visible?'fadeIn':'fadeOut'}><p className="flashCss">{this.state.passwordMessage}</p></div>
            <Route 
              path="/homescreen" 
              render= { (props) => <HomeScreen
                                      user_in_app_state={this.state.user_in_app_state}
                                      products={this.state.products}
                                      addToCart={this.addToCart.bind(this)}
                                      cartItemsNoUser={this.state.cartItemsNoUser}
                                      addToCartNoUser={this.addToCartNoUser.bind(this)}
                                      filteredProducts={this.state.filteredProducts}
                                      sortFilteredProducts={this.sortFilteredProducts.bind(this)}
                                      searchTerm={this.state.searchTerm}
                                      arrangeFilteredProducts={this.arrangeFilteredProducts.bind(this)}
                                      categorizeFilteredProducts={this.categorizeFilteredProducts.bind(this)}
                                      category={this.state.category}
                                      screen={this.state.screen}
                                    /> 
                      }
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
              render= { (props) => <SettingsUserHome user_in_app_state={this.state.user_in_app_state} setUserObject={this.setUserObject.bind(this)} navigateScreen={this.navigateScreen.bind(this)} /> }
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
            <Route 
              path="/cartguest" 
              render= { (props) => <CartGuestHelper
                                      user_in_app_state={this.state.user_in_app_state}
                                      setUserObject={this.setUserObject.bind(this)}
                                      navigateScreen={this.navigateScreen.bind(this)}
                                      cartItemsNoUser={this.state.cartItemsNoUser}
                                      changeCartItemGuest={this.changeCartItemGuest.bind(this)}
                                    /> 
                      }
            />
            <Route 
              path="/cartuser" 
              render= { (props) => <CartUserHelper
                                      user_in_app_state={this.state.user_in_app_state}
                                      setUserObject={this.setUserObject.bind(this)}
                                      navigateScreen={this.navigateScreen.bind(this)}
                                      cart_items={this.state.cart_items}
                                      changeCartItemUser={this.changeCartItemUser.bind(this)}
                                    /> 
                      }
            />
            <Route
              path="/forgotpassword"
              render= { (props) => <ForgotPassword
                                      sendForgotEmail={this.sendForgotEmail.bind(this)}
                                   />
                      }
            />
          </div>
      </div>
    );
  }
}

export default withRouter(NavigationBridge);
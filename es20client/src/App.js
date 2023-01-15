import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, useNavigation } from "react-router-dom";
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import HomeScreen from './components/HomeScreen';
import ProductsHome from './components/ProductsHome';
import CareersHome from './components/CareersHome';
import ContactUsHome from './components/ContactUsHome';
import UserHome from './components/UserHome';
import Navbar from './components/Navbar/Navbar';
import './components/App.css';

class App extends Component {
  constructor(props){  
      super(props);  
      this.state = {  
           data: 'www.javatpoint.com',
           user_in_app_state: false
        }  
      this.handleEvent = this.handleEvent.bind(this);  
  }
  handleEvent(){  
    console.log('src/App handleEvent. this.props', this.props);
    console.log('src/App handleEvent. this.state', this.state);
  } 
  componentWillMount() {
    console.log('src/App componentWillMount this.props', this.props);
    console.log('src/App componentWillMount this.state', this.state);
  }
  componentDidMount() {
    fetch("api/v1/logged_in", {
      credentials: "same-origin",
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log('user ~>', user);
          console.log('user.logged_in ~>', user.logged_in);

          console.log('this.state is_logged_in? before', this.state);
          if (user.logged_in) {
            this.setState({ user_in_app_state: user });
            console.log('this.state is_logged_in? after', this.state);
            // reimplement
            console.log('setCurrentUser(user)');
            // setCurrentUser(user);
            // reimplement
            console.log('setAuthenticated(true)');
            // setAuthenticated(true);
          } else {

          }
        });
      } else {
        console.log('setAuthenticated(true)');
        // reimplement
        // setAuthenticated(true);
      }
    });
  }
  setUserObject(user_in_app_state) {
    console.log('setting user object src/App', user_in_app_state);
    this.setState({ user_in_app_state: user_in_app_state });
  }
  render() {  
    // reimplement
    // if (!authenticated) {
    //   return <div></div>;
    // }
    return (
      <div>
        <Router>
          <div className="App">
            <Navbar />            
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
              path="/userhome"
              render= { (props) => <UserHome setUserObject={this.setUserObject.bind(this)} user_in_app_state={this.state.user_in_app_state} /> }
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
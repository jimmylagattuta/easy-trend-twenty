import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
           user_object: null
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
          console.log('this.state is_logged_in? before', this.state);
          this.setState({ user_object: user });
          console.log('this.state is_logged_in? after', this.state);
          // reimplement
          console.log('setCurrentUser(user)');
          // setCurrentUser(user);
          // reimplement
          console.log('setAuthenticated(true)');
          // setAuthenticated(true);
        });
      } else {
        console.log('setAuthenticated(true)');
        // reimplement
        // setAuthenticated(true);
      }
    });
  }
  setUserObject(user_object) {
    console.log('setting user object src/App');
    this.setState({ user_object: user_object });
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
            <Route path="/" exact component={HomeScreen} user_object={this.state.user_object} />
            <Route path="/productshome" component={ProductsHome} user_object={this.state.user_object} />
            <Route path="/careershome" component={CareersHome} user_object={this.state.user_object} />
            <Route path="/contactushome" component={ContactUsHome} user_object={this.state.user_object} />
            <Route path="/userhome" component={UserHome} user_object={this.state.user_object} setUserObject={this.setUserObject.bind(this)} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
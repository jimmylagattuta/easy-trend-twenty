import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Route, Link, withRouter } from "react-router-dom";
import NavbarComponent from './components/Navbar/NavbarComponent';
import NavigateToScreen from './components/helpers/NavigateToScreen';
import NavigationBridge from './components/NavigationBridge';

import './components/App.css';
  // "proxy": "https://sleepy-brook-50921.herokuapp.com",
  // "proxy": "http://localhost:3000",

class App extends Component {
  render() {  
    return (
      <div>
        <BrowserRouter>
          <NavigationBridge />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
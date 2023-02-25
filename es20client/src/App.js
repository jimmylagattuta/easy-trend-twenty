import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Route, Link, withRouter } from "react-router-dom";
import { Container } from 'react-bootstrap';
import NavbarComponent from './components/Navbar/NavbarComponent';
import NavigateToScreen from './components/helpers/NavigateToScreen';
import NavigationBridge from './components/NavigationBridge';

import './components/App.css';
  // was in procfile
  // "proxy": "https://easytrend20.herokuapp.com",
  // "proxy": "https://sleepy-brook-50921.herokuapp.com",
  // "proxy": "http://localhost:3000",

class App extends Component {
  render() {  
    return (
      <Container>
        <BrowserRouter>
          <NavigationBridge />
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;
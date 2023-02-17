import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Route, Link, withRouter } from "react-router-dom";
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import HomeScreen from './components/HomeScreen';
import ProductsHome from './components/ProductsHome';
import CareersHome from './components/CareersHome';
import ContactUsHome from './components/ContactUsHome';
import { Container } from 'react-bootstrap';
import UserHome from './components/UserHome';
import NavbarComponent from './components/Navbar/NavbarComponent';
import NavigateToScreen from './components/helpers/NavigateToScreen';
import NavigationBridge from './components/NavigationBridge';

import './components/App.css';
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
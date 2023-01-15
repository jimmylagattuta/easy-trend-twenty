import React, { Component, useState, useEffect } from "react";
import { BrowserRouter, Route, Link, withRouter } from "react-router-dom";
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import HomeScreen from './components/HomeScreen';
import ProductsHome from './components/ProductsHome';
import CareersHome from './components/CareersHome';
import ContactUsHome from './components/ContactUsHome';
import UserHome from './components/UserHome';
import Navbar from './components/Navbar/Navbar';
import NavigateToScreen from './components/helpers/NavigateToScreen';
import NavigationBridge from './components/NavigationBridge';

import './components/App.css';

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
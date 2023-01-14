import React, { useState, useEffect } from "react";
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

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  console.log(currentUser);
  useEffect(() => {
    fetch("api/v1/logged_in", {
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          console.log('user', user);
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
  }, []);

  if (!authenticated) {
    return <div></div>;
  }
  return (
    <div>
      <h1>Marketplace App</h1>

      <Router>
        <div className="App">
          <Navbar />
          <Route path="/" exact component={HomeScreen} />
          <Route path="/productshome" component={ProductsHome} />
          <Route path="/careershome" component={CareersHome} />
          <Route path="/contactushome" component={ContactUsHome} />
          <Route path="/userhome" component={UserHome} />
        </div>
      </Router>
    </div>
  );
}

export default App;
import logo from './logo.svg';
import './App.css';
import React, {Component, useEffect} from 'react';

class App extends Component {
  componentWillMount() {
    this.useEffect();
  }
    useEffect() {
        fetch('api/v1/notes')
        .then(resp => resp.json())
        .then(data => console.log(data))
      
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Editt <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
    }
}

export default App;

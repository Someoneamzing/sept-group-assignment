// import logo from './logo.svg';
import React from "react";
import Header from "./components/Layout/Header";
import Contact from "./components/Layout/Contact";
import { Route, Switch } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
        <div>
          <Switch>
            <Route exact path="/contact" render={props => <Contact {...props} />} />
          </Switch>
        </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
